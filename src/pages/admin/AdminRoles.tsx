
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2,
  ShieldCheck
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

// Mock roles data
const rolesData = [
  { id: 1, name: 'مدير' },
  { id: 2, name: 'مزود خدمة' },
  { id: 3, name: 'عميل' },
  // { id: 4, name: 'مشرف' }
];

const AdminRoles = () => {
  const [roles, setRoles] = useState(rolesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<{ id: number, name: string } | null>(null);
  const [newRoleName, setNewRoleName] = useState('');
  
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = () => {
    if (newRoleName.trim() === '') return;
    
    const newRole = {
      id: roles.length > 0 ? Math.max(...roles.map(r => r.id)) + 1 : 1,
      name: newRoleName
    };
    
    setRoles([...roles, newRole]);
    setNewRoleName('');
    setIsAddDialogOpen(false);
  };
  
  const handleEditRole = () => {
    if (!currentRole || newRoleName.trim() === '') return;
    
    const updatedRoles = roles.map(role => 
      role.id === currentRole.id 
        ? { ...role, name: newRoleName } 
        : role
    );
    
    setRoles(updatedRoles);
    setNewRoleName('');
    setCurrentRole(null);
    setIsEditDialogOpen(false);
  };
  
  const handleDeleteRole = () => {
    if (!currentRole) return;
    
    const updatedRoles = roles.filter(
      role => role.id !== currentRole.id
    );
    
    setRoles(updatedRoles);
    setCurrentRole(null);
    setIsDeleteDialogOpen(false);
  };
  
  const openEditDialog = (role: { id: number, name: string }) => {
    setCurrentRole(role);
    setNewRoleName(role.name);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (role: { id: number, name: string }) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الأدوار</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" />
              <span>إضافة دور</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة دور جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input 
                  placeholder="اسم الدور" 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddRole}>إضافة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن دور..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة الأدوار</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredRoles.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>
                  <div className="flex items-center gap-2">

                    اسم الدور
                  </div>
                    </TableHead>
                  <TableHead className="text-left">
                  <div className="flex items-center gap-2">
                    
                    الإجراءات
                    </div>
                    </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span>{role.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(role)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(role)}
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
              <ShieldCheck className="h-10 w-10 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">لا توجد أدوار</h3>
              <p className="text-muted-foreground">لم يتم العثور على أدوار مطابقة لمعايير البحث.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل دور</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input 
                placeholder="اسم الدور" 
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button onClick={handleEditRole}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>حذف دور</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              هل أنت متأكد من رغبتك في حذف دور &quot;{currentRole?.name}&quot;؟
            </p>
            <p className="text-center text-muted-foreground text-sm mt-2">
              لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">إلغاء</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteRole}>حذف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRoles;
