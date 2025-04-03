import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  MapPin,
  Loader
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRegions, createRegion, updateRegion, deleteRegion } from '@/api/regions';
import { useAuth } from '@/context/AuthProvider';

const AdminRegions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<{ id: number, name: string } | null>(null);
  const [newRegionName, setNewRegionName] = useState('');
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: regions = [], isLoading: loadingRegions } = useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions,
  });

  const addRegionMutation = useMutation({
    mutationFn: (name: string) => createRegion({ name }, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] });
      toast({
        title: "تم إضافة المنطقة",
        description: "تم إضافة المنطقة بنجاح",
      });
      setIsAddDialogOpen(false);
      setNewRegionName('');
    },
    onError: (error) => {
      console.error('Error adding region:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة المنطقة",
        variant: "destructive",
      });
    },
  });

  const updateRegionMutation = useMutation({
    mutationFn: ({ id, name }: { id: number, name: string }) => 
      updateRegion(id, { name }, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] });
      toast({
        title: "تم تحديث المنطقة",
        description: "تم تحديث المنطقة بنجاح",
      });
      setIsEditDialogOpen(false);
      setCurrentRegion(null);
      setNewRegionName('');
    },
    onError: (error) => {
      console.error('Error updating region:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث المنطقة",
        variant: "destructive",
      });
    },
  });

  const deleteRegionMutation = useMutation({
    mutationFn: (id: number) => deleteRegion(id, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['regions'] });
      toast({
        title: "تم حذف المنطقة",
        description: "تم حذف المنطقة بنجاح",
      });
      setIsDeleteDialogOpen(false);
      setCurrentRegion(null);
    },
    onError: (error) => {
      console.error('Error deleting region:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنطقة",
        variant: "destructive",
      });
    },
  });

  const handleAddRegion = () => {
    if (newRegionName.trim() === '') return;
    addRegionMutation.mutate(newRegionName);
  };
  
  const handleEditRegion = () => {
    if (!currentRegion || newRegionName.trim() === '') return;
    updateRegionMutation.mutate({ id: currentRegion.id, name: newRegionName });
  };
  
  const handleDeleteRegion = () => {
    if (!currentRegion) return;
    deleteRegionMutation.mutate(currentRegion.id);
  };
  
  const openEditDialog = (region: { id: number, name: string }) => {
    setCurrentRegion(region);
    setNewRegionName(region.name);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (region: { id: number, name: string }) => {
    setCurrentRegion(region);
    setIsDeleteDialogOpen(true);
  };
  
  const filteredRegions = regions.filter((region: any) => 
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المناطق</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!token}>
              <Plus className="h-4 w-4 mr-1" />
              <span>إضافة منطقة</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة منطقة جديدة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input 
                  placeholder="اسم المنطقة" 
                  value={newRegionName}
                  onChange={(e) => setNewRegionName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={handleAddRegion}
                disabled={addRegionMutation.isPending || newRegionName.trim() === ''}
              >
                {addRegionMutation.isPending ? (
                  <>
                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                    <span>جاري الإضافة...</span>
                  </>
                ) : (
                  <span>إضافة</span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن منطقة..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة المناطق</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingRegions ? (
            <div className="flex justify-center py-10">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredRegions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>اسم المنطقة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegions.map((region: any) => (
                  <TableRow key={region.id}>
                    <TableCell className="font-medium">{region.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{region.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(region)}
                          disabled={!token}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(region)}
                          disabled={!token}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <MapPin className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">لا توجد مناطق</h3>
              <p className="text-muted-foreground">لم يتم العثور على مناطق مطابقة لمعايير البحث.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل منطقة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input 
                placeholder="اسم المنطقة" 
                value={newRegionName}
                onChange={(e) => setNewRegionName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button 
              onClick={handleEditRegion}
              disabled={updateRegionMutation.isPending || newRegionName.trim() === ''}
            >
              {updateRegionMutation.isPending ? (
                <>
                  <Loader className="h-4 w-4 mr-1 animate-spin" />
                  <span>جاري التحديث...</span>
                </>
              ) : (
                <span>حفظ التغييرات</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>حذف منطقة</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              هل أنت متأكد من رغبتك في حذف منطقة &quot;{currentRegion?.name}&quot;؟
            </p>
            <p className="text-center text-muted-foreground text-sm mt-2">
              لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteRegion}
              disabled={deleteRegionMutation.isPending}
            >
              {deleteRegionMutation.isPending ? (
                <>
                  <Loader className="h-4 w-4 mr-1 animate-spin" />
                  <span>جاري الحذف...</span>
                </>
              ) : (
                <span>حذف</span>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRegions;
