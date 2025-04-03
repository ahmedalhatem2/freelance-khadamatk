
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin
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
import {
  fetchRegions,
  createRegion,
  updateRegion,
  deleteRegion,
  Region,
} from '@/api/regions';
import { useAuth } from "@/context/AuthProvider";

const AdminRegions = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [newRegionName, setNewRegionName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadRegions = async () => {
    if (!token) {
        console.error("No token available for regions loading.");
        return;
    }
    setIsLoading(true);
    try {
        const data = await fetchRegions(token);
        setRegions(data);
    } catch (error) {
        console.error("Error loading regions:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRegions();
  }, [token]); //Re-fetch regions if token changes


  const handleAddRegion = async () => {
    if (newRegionName.trim() === '') return;
      if (!token) {
        console.error("No token available for adding region.");
        return;
    }
    try {
      const newRegion = await createRegion({ name: newRegionName }, token);
      setRegions([...regions, newRegion]);
      setNewRegionName('');
      setIsAddDialogOpen(false);
    } catch (error) {
        console.error("Error adding region:", error);
    }
  };

  const handleEditRegion = async () => {
    if (!currentRegion || newRegionName.trim() === '') return;
    if (!token) {
        console.error("No token available for updating region.");
        return;
    }
    try {
      const updatedRegion = await updateRegion(currentRegion.id, { name: newRegionName }, token);
      setRegions(regions.map(region => region.id === currentRegion.id ? updatedRegion : region));
      setNewRegionName('');
      setCurrentRegion(null);
      setIsEditDialogOpen(false);
    } catch (error) {
        console.error("Error updating region:", error);
    }
  };

  const handleDeleteRegion = async () => {
    if (!currentRegion) return;
    if (!token) {
        console.error("No token available for deleting region.");
        return;
    }
    try {
      await deleteRegion(currentRegion.id, token);
      setRegions(regions.filter(region => region.id !== currentRegion.id));
      setCurrentRegion(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
        console.error("Error deleting region:", error);
    }
  };

  const openEditDialog = (region: Region) => {
    setCurrentRegion(region);
    setNewRegionName(region.name);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (region: Region) => {
    setCurrentRegion(region);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المناطق</h2>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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
              <Button type="submit" onClick={handleAddRegion}>إضافة</Button>
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
          {isLoading ? (
                <div className="text-center py-10">
                    <p>Loading...</p>
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
                {filteredRegions.map((region) => (
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
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(region)}
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
            <Button onClick={handleEditRegion}>حفظ التغييرات</Button>
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
            <Button variant="destructive" onClick={handleDeleteRegion}>حذف</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminRegions;
