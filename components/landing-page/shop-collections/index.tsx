import { Badge } from "@/components/ui/badge";

const collections = [
    {
        name: "Tops",
        image: "/images/landing-page/shop-collections/top.avif", // Ganti dengan path gambar yang sesuai
        count: 18,
    },
    {
        name: "Bottoms",
        image: "/images/landing-page/shop-collections/bottom.avif",
        count: 8,
    },
    {
        name: "Bags",
        image: "/images/landing-page/shop-collections/bags.avif",
        count: 18,
    },
    {
        name: "Shoes",
        image: "/images/landing-page/shop-collections/shoes.avif",
        count: 7,
    },
    {
        name: "Coats & Jackets",
        image: "/images/landing-page/shop-collections/coat_jacket.avif",
        count: 18,
    },
    {
        name: "Accessories",
        image: "/images/landing-page/shop-collections/accessories.avif",
        count: 8,
    },
];

const ShopCollections = () => {
    return (
        <section className="py-12 text-center">
            <h2 className="text-2xl font-bold">Shop The Collections</h2>
            <p className="mt-2 text-gray-500">
                Shop the latest products from the most popular collections
            </p>

            <div className="mt-8 flex justify-center flex-wrap gap-8">
                {collections.map((collection, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2 text-center"
                    >
                        <div className="relative">
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-32 h-32 rounded-full object-cover shadow-lg"
                            />
                            <Badge
                                className="absolute bottom-1 right-1 bg-black text-white text-xs px-2 py-1"
                            >
                                {collection.count}
                            </Badge>
                        </div>
                        <h3 className="mt-2 text-sm font-medium">{collection.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopCollections;
