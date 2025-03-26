
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CustomBadge } from '@/components/ui/custom-badge';
import { 
  Search, 
  Briefcase,
  Tag,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

// Mock services data
const servicesData = [
  {
    id: 1,
    title: 'تصميم شعار احترافي',
    category: { id: 1, name: 'تصميم' },
    description: 'تصميم شعار احترافي وفريد يعكس هوية علامتك التجارية.',
    image: 'https://placehold.co/600x400?text=Logo+Design',
    status: 'active',
    price: 500,
    provider: { id: 1, first_name: 'أحمد', last_name: 'محمد', image: 'https://i.pravatar.cc/150?img=1' }
  },
  {
    id: 2,
    title: 'تطوير موقع إلكتروني',
    category: { id: 2, name: 'برمجة' },
    description: 'تطوير موقع إلكتروني متجاوب مع كافة الأجهزة باستخدام أحدث التقنيات.',
    image: 'https://placehold.co/600x400?text=Web+Development',
    status: 'active',
    price: 3000,
    provider: { id: 3, first_name: 'محمد', last_name: 'عبدالله', image: 'https://i.pravatar.cc/150?img=3' }
  },
  {
    id: 3,
    title: 'كتابة محتوى تسويقي',
    category: { id: 5, name: 'كتابة محتوى' },
    description: 'كتابة محتوى تسويقي جذاب ومحسن لمحركات البحث.',
    image: 'https://placehold.co/600x400?text=Content+Writing',
    status: 'inactive',
    price: 200,
    provider: { id: 4, first_name: 'سارة', last_name: 'خالد', image: 'https://i.pravatar.cc/150?img=5' }
  },
  {
    id: 4,
    title: 'تسويق عبر وسائل التواصل الاجتماعي',
    category: { id: 3, name: 'تسويق' },
    description: 'إدارة حسابات التواصل الاجتماعي وتنفيذ حملات إعلانية مستهدفة.',
    image: 'https://placehold.co/600x400?text=Social+Media+Marketing',
    status: 'active',
    price: 1500,
    provider: { id: 5, first_name: 'خالد', last_name: 'أحمد', image: 'https://i.pravatar.cc/150?img=4' }
  },
  {
    id: 5,
    title: 'ترجمة محتوى',
    category: { id: 4, name: 'ترجمة' },
    description: 'ترجمة محتوى من وإلى اللغة العربية والإنجليزية بدقة عالية.',
    image: 'https://placehold.co/600x400?text=Translation',
    status: 'active',
    price: 150,
    provider: { id: 6, first_name: 'فاطمة', last_name: 'علي', image: 'https://i.pravatar.cc/150?img=6' }
  }
];

const AdminServices = () => {
  const [services, setServices] = useState(servicesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.provider.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (serviceId: number) => {
    setServices(services.map(service => 
      service.id === serviceId 
        ? { 
            ...service, 
            status: service.status === 'active' ? 'inactive' : 'active' 
          } 
        : service
    ));
  };
  
  const openServiceDetails = (service: any) => {
    setSelectedService(service);
  };

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
          {filteredServices.length > 0 ? (
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
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img 
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{service.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CustomBadge variant="outline">
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        <span>{service.category.name}</span>
                      </CustomBadge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {service.price} ر.س
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <img 
                            src={service.provider.image}
                            alt={`${service.provider.first_name} ${service.provider.last_name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{service.provider.first_name} {service.provider.last_name}</span>
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
                                <div className="w-full aspect-video rounded-md overflow-hidden">
                                  <img 
                                    src={selectedService.image}
                                    alt={selectedService.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                
                                <div>
                                  <h3 className="text-xl font-bold">{selectedService.title}</h3>
                                  <div className="flex items-center gap-2 mt-2">
                                    <CustomBadge variant="outline">
                                      <Tag className="h-3.5 w-3.5 mr-1" />
                                      <span>{selectedService.category.name}</span>
                                    </CustomBadge>
                                    <CustomBadge variant={selectedService.status === 'active' ? 'default' : 'destructive'}>
                                      {selectedService.status === 'active' ? 'نشط' : 'غير نشط'}
                                    </CustomBadge>
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-muted/50 rounded-md">
                                  <p>{selectedService.description}</p>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                      <img 
                                        src={selectedService.provider.image}
                                        alt={`${selectedService.provider.first_name} ${selectedService.provider.last_name}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        {selectedService.provider.first_name} {selectedService.provider.last_name}
                                      </span>
                                      <div className="text-sm text-muted-foreground">مزود الخدمة</div>
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold">
                                    {selectedService.price} ر.س
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant={service.status === 'active' ? 'destructive' : 'default'} 
                          size="sm"
                          onClick={() => handleToggleStatus(service.id)}
                        >
                          {service.status === 'active' ? (
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
