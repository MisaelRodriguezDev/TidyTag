import React from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  updated: string;
  quantity: number;
}

const RecentProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Kraft Boxes (Small)",
      category: "Packaging",
      updated: "Updated 20",
      quantity: 12
    },
    {
      id: 2,
      name: "USB Barcode Scanner",
      category: "Packaging",
      updated: "Added 14 app",
      quantity: 48
    },
    {
      id: 3,
      name: "Paper Bags (L)",
      category: "Packaging",
      updated: "Updated 30 app",
      quantity: 8
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Products</h2>
      
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {product.category} • {product.updated}
                </p>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Qty {product.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;