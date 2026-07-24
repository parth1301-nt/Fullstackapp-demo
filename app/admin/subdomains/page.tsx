'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ExternalLink, Plus, Globe, Edit, Trash2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { EmojiPicker, EmojiPickerContent, EmojiPickerSearch, EmojiPickerFooter } from '@/components/ui/emoji-picker';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Smile } from 'lucide-react';

type Subdomain = {
  subdomain: string;
  emoji: string;
  createdAt: number;
};

export default function SubdomainsPage() {
  const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSubdomain, setEditingSubdomain] = useState<Subdomain | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const [newSubdomain, setNewSubdomain] = useState({
    subdomain: '',
    emoji: ''
  });

  const [editFormData, setEditFormData] = useState({
    subdomain: '',
    emoji: ''
  });

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // Load subdomains on mount
  useEffect(() => {
    fetchSubdomains();
  }, []);

  const fetchSubdomains = async () => {
    try {
      const response = await fetch('/api/subdomains');
      if (response.ok) {
        const data = await response.json();
        setSubdomains(data);
      }
    } catch (error) {
      console.error('Failed to fetch subdomains:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // CREATE
  const handleAddSubdomain = async () => {
    try {
      const formData = new FormData();
      formData.append('subdomain', newSubdomain.subdomain);
      formData.append('icon', newSubdomain.emoji);

      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        await fetchSubdomains();
        setNewSubdomain({ subdomain: '', emoji: '' });
        setIsAddDialogOpen(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create subdomain');
      }
    } catch (error) {
      console.error('Failed to create subdomain:', error);
      alert('Failed to create subdomain');
    }
  };

  // READ (with search filter)
  const filteredSubdomains = subdomains.filter(sub =>
    sub.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // UPDATE
  const handleEditSubdomain = (subdomain: Subdomain) => {
    setEditingSubdomain(subdomain);
    setEditFormData({
      subdomain: subdomain.subdomain,
      emoji: subdomain.emoji
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSubdomain = async () => {
    if (editingSubdomain) {
      try {
        const response = await fetch('/api/subdomains', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldSubdomain: editingSubdomain.subdomain,
            ...editFormData
          })
        });

        if (response.ok) {
          await fetchSubdomains();
          setIsEditDialogOpen(false);
          setEditingSubdomain(null);
        } else {
          alert('Failed to update subdomain');
        }
      } catch (error) {
        console.error('Failed to update subdomain:', error);
        alert('Failed to update subdomain');
      }
    }
  };

  // DELETE
  const handleDeleteSubdomain = async (subdomain: string) => {
    if (confirm('Are you sure you want to delete this subdomain?')) {
      try {
        const formData = new FormData();
        formData.append('subdomain', subdomain);

        const response = await fetch('/', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          await fetchSubdomains();
        } else {
          alert('Failed to delete subdomain');
        }
      } catch (error) {
        console.error('Failed to delete subdomain:', error);
        alert('Failed to delete subdomain');
      }
    }
  };

  const handleEmojiSelect = ({ emoji }: { emoji: string }) => {
    setNewSubdomain({ ...newSubdomain, emoji });
    setIsPickerOpen(false);
  };

  const handleEditEmojiSelect = ({ emoji }: { emoji: string }) => {
    setEditFormData({ ...editFormData, emoji });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subdomains</h1>
          <p className="text-gray-500 mt-1">Manage all your subdomains</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Subdomain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subdomain</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="add-subdomain">Subdomain</Label>
                <Input
                  id="add-subdomain"
                  value={newSubdomain.subdomain}
                  onChange={(e) => setNewSubdomain({ ...newSubdomain, subdomain: e.target.value })}
                  placeholder="your-subdomain"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-emoji">Icon</Label>
                <div className="flex items-center gap-2">
                  <input type="hidden" name="icon" value={newSubdomain.emoji} />
                  <div className="flex-1 flex items-center gap-2 p-2 border border-gray-300 rounded-lg">
                    <span className="text-2xl">{newSubdomain.emoji || 'No icon selected'}</span>
                    <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
                      <PopoverTrigger asChild>
                        <Button type="button" variant="outline" size="sm">
                          <Smile className="h-4 w-4 mr-2" />
                          Select Emoji
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[256px]" align="end" sideOffset={5}>
                        <EmojiPicker className="h-[300px] w-[256px]" onEmojiSelect={handleEmojiSelect}>
                          <EmojiPickerSearch />
                          <EmojiPickerContent />
                          <EmojiPickerFooter />
                        </EmojiPicker>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddSubdomain}>Create Subdomain</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search subdomains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {subdomains.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subdomains yet</h3>
            <p className="text-gray-500 mb-4">Create your first subdomain to get started</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Subdomain
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubdomains.map((subdomain) => (
            <Card key={subdomain.subdomain}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{subdomain.emoji}</span>
                    <CardTitle className="text-xl">{subdomain.subdomain}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditSubdomain(subdomain)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSubdomain(subdomain.subdomain)}
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-500">
                  Created: {new Date(subdomain.createdAt).toLocaleDateString()}
                </div>
                <a
                  href={`http://${subdomain.subdomain}.localhost:3000`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit subdomain
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subdomain</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-subdomain">Subdomain</Label>
              <Input
                id="edit-subdomain"
                value={editFormData.subdomain}
                onChange={(e) => setEditFormData({ ...editFormData, subdomain: e.target.value })}
                placeholder="your-subdomain"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-emoji">Icon</Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 p-2 border border-gray-300 rounded-lg">
                  <span className="text-2xl">{editFormData.emoji}</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Change Emoji
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[256px]" align="end" sideOffset={5}>
                      <EmojiPicker className="h-[300px] w-[256px]" onEmojiSelect={handleEditEmojiSelect}>
                        <EmojiPickerSearch />
                        <EmojiPickerContent />
                        <EmojiPickerFooter />
                      </EmojiPicker>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubdomain}>Update Subdomain</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
