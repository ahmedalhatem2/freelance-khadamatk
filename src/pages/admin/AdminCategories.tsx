/* eslint-disable @typescript-eslint/no-explicit-any */

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
  Tag,
  Briefcase,
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
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '@/api/categories';
import { useAuth } from '@/context/AuthProvider';
import { fetchServices } from '@/api/services';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{ id: number, name: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const { token } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: () => fetchServices(token),
  });

  // Calculate services count for each category
  const categoryServicesCount = (categoryId: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return services.filter((service: any) => service.category_id === categoryId).length;
  };

  const addCategoryMutation = useMutation({
    mutationFn: (name: string) => createCategory({ name }, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "تم إضافة التصنيف",
        description: "تم إضافة التصنيف بنجاح",
      });
      setIsAddDialogOpen(false);
      setNewCategoryName('');
    },
    onError: (error) => {
      console.error('Error adding category:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة التصنيف",
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, name }: { id: number, name: string }) => 
      updateCategory(id, { name }, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "تم تحديث التصنيف",
        description: "تم تحديث التصنيف بنجاح",
      });
      setIsEditDialogOpen(false);
      setCurrentCategory(null);
      setNewCategoryName('');
    },
    onError: (error) => {
      console.error('Error updating category:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث التصنيف",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "تم حذف التصنيف",
        description: "تم حذف التصنيف بنجاح",
      });
      setIsDeleteDialogOpen(false);
      setCurrentCategory(null);
    },
    onError: (error) => {
      console.error('Error deleting category:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف التصنيف",
        variant: "destructive",
      });
    },
  });

  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    addCategoryMutation.mutate(newCategoryName);
  };
  
  const handleEditCategory = () => {
    if (!currentCategory || newCategoryName.trim() === '') return;
    updateCategoryMutation.mutate({ id: currentCategory.id, name: newCategoryName });
  };
  
  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    deleteCategoryMutation.mutate(currentCategory.id);
  };
  
  const openEditDialog = (category: { id: number, name: string }) => {
    setCurrentCategory(category);
    setNewCategoryName(category.name);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (category: { id: number, name: string }) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredCategories = categories.filter((category: any) => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة التصنيفات</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!token}>
              <Plus className="h-4 w-4 mr-1" />
              <span>إضافة تصنيف</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة تصنيف جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input 
                  placeholder="اسم التصنيف" 
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button 
                type="submit" 
                onClick={handleAddCategory}
                disabled={addCategoryMutation.isPending || newCategoryName.trim() === ''}
              >
                {addCategoryMutation.isPending ? (
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
            placeholder="بحث عن تصنيف..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة التصنيفات</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingCategories ? (
            <div className="flex justify-center py-10">
              <Loader className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredCategories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead >
                    <div className="flex items-center gap-2">
                    اسم التصنيف
                    </div>
                    </TableHead>
                  <TableHead >
                  <div className="flex items-center gap-2">عدد الخدمات</div>
                    </TableHead>
                  <TableHead className="text-left">
                    <div className="flex items-center gap-2">

                    الإجراءات
                    </div>
                    </TableHead>
                </TableRow>
              </TableHeader>
                
              <TableBody>
                {filteredCategories.map((category: any) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        <span>{category.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{categoryServicesCount(category.id)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(category)}
                          disabled={!token}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(category)}
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
              <Tag className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">لا توجد تصنيفات</h3>
              <p className="text-muted-foreground">لم يتم العثور على تصنيفات مطابقة لمعايير البحث.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل تصنيف</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input 
                placeholder="اسم التصنيف" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button 
              onClick={handleEditCategory}
              disabled={updateCategoryMutation.isPending || newCategoryName.trim() === ''}
            >
              {updateCategoryMutation.isPending ? (
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
            <DialogTitle>حذف تصنيف</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              هل أنت متأكد من رغبتك في حذف تصنيف &quot;{currentCategory?.name}&quot;؟
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
              onClick={handleDeleteCategory}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? (
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

export default AdminCategories;
