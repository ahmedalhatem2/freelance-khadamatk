
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CustomBadge } from '@/components/ui/custom-badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Briefcase,
  Tag,
  User,
  CheckCircle,
  XCircle,
  Loader
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchServices, updateService } from '@/api/services';

const AdminServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch services data
  const { 
    data: services = [], 
    isLoading,
    error 
  } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(token),
    enabled: !!token,
  });
  
  // Update service status mutation
  const updateServiceMutation = useMutation({
    mutationFn: ({ serviceId, status }: { serviceId: number; status: string }) => {
      const formData = new FormData();
      formData.append('status', status);
      return updateService(serviceId, formData, token || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast({
        title: "تم بنجاح",
        description: "تم تحديث حالة الخدمة بنجاح",
      });
    },
    onError: (error) => {
      console.error("Error updating service status:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الخدمة",
        variant: "destructive",
      });
    },
  });

  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.profile?.user?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.profile?.user?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (serviceId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    updateServiceMutation.mutate({ serviceId, status: newStatus });
  };
  
  const openServiceDetails = (service: any) => {
    setSelectedService(service);
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-destructive">
          <p className="text-lg font-medium">حدث خطأ أثناء تحميل البيانات</p>
          <p className="text-sm mt-2">
            يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الخدمات</h2>
      </div>

      <div className="flex justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن خدمة..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة الخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredServices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>الخدمة</TableHead>
                  <TableHead>التصنيف</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>مزود الخدمة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service: any) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                          {service.image ? (
                            <img 
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Briefcase className="h-full w-full p-3 text-muted-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{service.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CustomBadge variant="outline">
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        <span>{service.category?.name || 'غير مصنف'}</span>
                      </CustomBadge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {service.price} ل.س
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                          {service.profile?.user?.image ? (
                            <img 
                              src={service.profile.user.image}
                              alt={`${service.profile.user.first_name} ${service.profile.user.last_name}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-full w-full p-1 text-muted-foreground" />
                          )}
                        </div>
                        <span>
                          {service.profile?.user?.first_name} {service.profile?.user?.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CustomBadge variant={service.status === 'active' ? 'default' : 'destructive'}>
                        {service.status === 'active' ? 'نشط' : 'غير نشط'}
                      </CustomBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openServiceDetails(service)}
                            >
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>التفاصيل</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>تفاصيل الخدمة</DialogTitle>
                            </DialogHeader>
                            {selectedService && (
                              <div className="space-y-4 py-4">
                                <div className="w-full aspect-video rounded-md overflow-hidden bg-muted">
                                  {selectedService.image ? (
                                    <img 
                                      src={selectedService.image}
                                      alt={selectedService.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <Briefcase className="h-full w-full p-12 text-muted-foreground" />
                                  )}
                                </div>
                                
                                <div>
                                  <h3 className="text-xl font-bold">{selectedService.title}</h3>
                                  <div className="flex items-center gap-2 mt-2">
                                    <CustomBadge variant="outline">
                                      <Tag className="h-3.5 w-3.5 mr-1" />
                                      <span>{selectedService.category?.name || 'غير مصنف'}</span>
                                    </CustomBadge>
                                    <CustomBadge variant={selectedService.status === 'active' ? 'default' : 'destructive'}>
                                      {selectedService.status === 'active' ? 'نشط' : 'غير نشط'}
                                    </CustomBadge>
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <p>{selectedService.desc}</p>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                                      {selectedService.profile?.user?.image ? (
                                        <img 
                                          src={selectedService.profile.user.image}
                                          alt={`${selectedService.profile.user.first_name} ${selectedService.profile.user.last_name}`}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <User className="h-full w-full p-2 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        {selectedService.profile?.user?.first_name} {selectedService.profile?.user?.last_name}
                                      </span>
                                      <div className="text-sm text-muted-foreground">مزود الخدمة</div>
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold">
                                    {selectedService.price} ل.س
                                  </div>
                                </div>
                                
                                {selectedService.rates && selectedService.rates.length > 0 && (
                                  <div>
                                    <h4 className="font-medium mb-2">التقييمات ({selectedService.rates.length})</h4>
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                      {selectedService.rates.map((rate: any) => (
                                        <div key={rate.id} className="p-2 bg-muted/50 rounded-md">
                                          <div className="flex items-center gap-1 mb-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                              <div key={i} className={`w-3 h-3 rounded-full ${i < rate.num_star ? 'bg-yellow-400' : 'bg-muted-foreground/30'}`} />
                                            ))}
                                            <span className="text-xs text-muted-foreground mr-1">({rate.num_star}/5)</span>
                                          </div>
                                          <p className="text-sm">{rate.comment}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant={service.status === 'active' ? 'destructive' : 'default'} 
                          size="sm"
                          onClick={() => handleToggleStatus(service.id, service.status)}
                          disabled={updateServiceMutation.isPending}
                        >
                          {updateServiceMutation.isPending ? (
                            <Loader className="h-4 w-4 animate-spin" />
                          ) : service.status === 'active' ? (
                            <>
                              <XCircle className="h-4 w-4 mr-1" />
                              <span>إيقاف</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>تفعيل</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Briefcase className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">لا توجد خدمات</h3>
              <p className="text-muted-foreground">لم يتم العثور على خدمات مطابقة لمعايير البحث.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
