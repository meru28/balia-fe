'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {ChevronDown, Edit2, Plus, PlusCircle, Search, Trash2, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Bags');

  const categories = [
    { id: 85, name: 'Hand bags', slug: 'hand-bags', group: 'Bags', icon: '👜' },
    { id: 88, name: 'Laptop bags', slug: 'laptop-bags', group: 'Bags', icon: '💼' },
    { id: 86, name: 'Shoulder bags', slug: 'shoulder-bags', group: 'Bags', icon: '👝' },
    { id: 84, name: 'Purse', slug: 'purse', group: 'Bags', icon: '👛' },
    { id: 87, name: 'Wallet', slug: 'wallet', group: 'Bags', icon: '💰' },
  ]
  return (
    <div className="tw-container tw-mx-auto tw-p-10 tw-py-5">
      <div className="tw-flex tw-justify-between tw-mb-6 tw-bg-white tw-rounded-lg tw-p-4 tw-shadow-lg">
        <div className="tw-flex tw-items-center tw-gap-2">
          <div className="tw-w-1 tw-h-6 tw-bg-emerald-500" />
          <h1 className="tw-text-3xl tw-p-0 tw-m-0 tw-font-bold">Products</h1>
        </div>
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-relative tw-flex-1 tw-shadow">
            <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 -tw-translate-y-1/2 tw-text-gray-400" />
            <Input
              placeholder="Search by Name"
              className="tw-pl-9 tw-bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="tw-relative tw-w-[200px] tw-shadow">
            <Select value={selectedGroup} onValueChange={setSelectedGroup}>
              <SelectTrigger className="tw-w-full tw-bg-white">
                <SelectValue placeholder="Select group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bags">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <span>Bags</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="tw-absolute tw-right-8 tw-top-1/2 -tw-translate-y-1/2">
              <X className="tw-h-4 tw-w-4 tw-text-gray-400" />
            </div>
            <div className="tw-absolute tw-right-2 tw-top-1/2 -tw-translate-y-1/2">
              <ChevronDown className="tw-h-4 tw-w-4 tw-text-gray-400" />
            </div>
          </div>
          <Link href="/bdashboard/product-management/add">
            <Button className="tw-bg-emerald-500 hover:tw-bg-emerald-600">
              <Plus className="tw-mr-2 tw-h-4 tw-w-4" /> Add Product
            </Button>
          </Link>
        </div>
        {/*<Link href="/bdashboard/product-management/add">*/}
        {/*  <Button>*/}
        {/*    <PlusCircle className="tw-mr-2 tw-h-4 tw-w-4" />*/}
        {/*    Add Product*/}
        {/*  </Button>*/}
        {/*</Link>*/}
      </div>

      <div className="tw-rounded-lg tw-border tw-border-gray-200 tw-bg-white tw-shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="tw-font-medium">#{category.id}</TableCell>
                <TableCell>
                  <div className="tw-flex tw-items-center tw-gap-3">
                    <div className="tw-h-10 tw-w-10 tw-rounded tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                      <Image src="/placeholder.svg" alt="" width={24} height={24} className="tw-h-6 tw-w-6" />
                    </div>
                    <span className="tw-font-medium">{category.name}</span>
                  </div>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell>{category.icon}</TableCell>
                <TableCell className="tw-text-gray-600">{category.slug}</TableCell>
                <TableCell className="tw-text-gray-600">{category.group}</TableCell>
                <TableCell>
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <Button variant="ghost" size="sm" className="tw-h-8 tw-w-8 tw-p-0">
                      <Edit2 className="tw-h-4 tw-w-4 tw-text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="sm" className="tw-h-8 tw-w-8 tw-p-0 tw-text-red-500">
                      <Trash2 className="tw-h-4 tw-w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}