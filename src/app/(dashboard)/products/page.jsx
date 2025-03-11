import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="tw-mx-auto">
      <div className="tw-flex tw-justify-between tw-mb-6">
        <h1 className="tw-text-3xl tw-font-bold">Products</h1>
        <Link href="/products/add">
          <Button>
            <PlusCircle className="tw-mr-2 tw-h-4 tw-w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="tw-bg-card tw-p-8 tw-rounded-lg tw-text-center">
        <h2 className="tw-text-xl tw-font-medium tw-mb-2">No Products Yet</h2>
        <p className="tw-text-muted-foreground tw-mb-4">
          Get started by adding your first product
        </p>
        <Link href="/products/add">
          <Button>
            <PlusCircle className="tw-mr-2 tw-h-4 tw-w-4" />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}