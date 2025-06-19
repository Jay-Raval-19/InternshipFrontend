import React, { useState } from 'react';
import './Profile.css';

const mockProfile = {
  profilePic: 'https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_512dp.png',
  fullName: 'Jay Raval',
  gmail: 'jayraval@gmail.com',
  organization: 'Ahmedabad University',
  gst: '24ABCDE1234F1Z5',
  address: 'Ahmedabad, Gujarat',
  phone: '+91 9876543210',
  pin: '380009',
  company: 'Sourceasy',
};

const mockBuyProducts = [
  'Acetic Acid',
  'Sodium Hydroxide',
  'Calcium Carbonate',
];

const mockSellProducts = [
  {
    productName: 'Sodium Thioglycolate',
    productDescription: 'White powder with 99% purity, used in cosmetics.',
    category: 'Pharmaceutical Chemicals',
    price: 205,
    size: '50 Kg',
    unit: 'Kg',
    minOrder: 120,
    productPicture: 'https://example.com/images/sodium_thioglycolate.jpg',
    sellerName: 'Varanasi Chem Supplies',
    sellerEmail: 'sales@varanasichem.com',
    sellerPhone: '9313456789',
    region: 'Uttar Pradesh',
    sellerVerified: true,
    rating: 4.8,
  },
  // Add more mock products as needed
];

const TABS = [
  { id: 'buy', label: 'Products You Buy' },
  { id: 'sell', label: 'Products You Sell' },
  { id: 'history', label: 'History' },
];

const Profile = () => {
  const [tab, setTab] = useState('buy');
  const [sellProducts, setSellProducts] = useState(mockSellProducts);
  const [editIdx, setEditIdx] = useState(-1);
  const [editProduct, setEditProduct] = useState(null);

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditProduct({ ...sellProducts[idx] });
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEditSave = (idx) => {
    const updated = [...sellProducts];
    updated[idx] = editProduct;
    setSellProducts(updated);
    setEditIdx(-1);
    setEditProduct(null);
  };

  return (
    <div className="profile-fullpage-container">
      {/* Sidebar */}
      <aside className="profile-sidebar-fixed">
        <div className="profile-card-modern">
          <img src={mockProfile.profilePic} alt="Profile" className="profile-pic-modern" />
          <h2 className="profile-name-modern">{mockProfile.fullName}</h2>
          <p className="profile-email-modern">{mockProfile.gmail}</p>
          <div className="profile-info-modern">
            <div><span className="profile-label">Organization:</span> <span className="profile-value">{mockProfile.organization}</span></div>
            <div><span className="profile-label">GST:</span> <span className="profile-value">{mockProfile.gst}</span></div>
            <div><span className="profile-label">Address:</span> <span className="profile-value">{mockProfile.address}</span></div>
            <div><span className="profile-label">Phone:</span> <span className="profile-value">{mockProfile.phone}</span></div>
            <div><span className="profile-label">PIN Code:</span> <span className="profile-value">{mockProfile.pin}</span></div>
            <div><span className="profile-label">Company:</span> <span className="profile-value">{mockProfile.company}</span></div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="profile-main-modern">
        <div className="profile-tabs-modern">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn-modern${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="profile-tab-content-modern animated-tab">
          {tab === 'buy' && (
            <div className="buy-list-modern">
              {mockBuyProducts.map((prod, i) => (
                <div className="buy-card-modern" key={i}>
                  <span className="buy-product-name">{prod}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'sell' && (
            <div className="sell-list-modern">
              {sellProducts.map((prod, i) => (
                <div className="product-card-modern" key={i}>
                  {editIdx === i ? (
                    <div className="edit-form-modern">
                      <input name="productName" value={editProduct.productName} onChange={handleEditChange} />
                      <input name="productDescription" value={editProduct.productDescription} onChange={handleEditChange} />
                      <input name="category" value={editProduct.category} onChange={handleEditChange} />
                      <input name="price" value={editProduct.price} onChange={handleEditChange} />
                      <input name="size" value={editProduct.size} onChange={handleEditChange} />
                      <input name="unit" value={editProduct.unit} onChange={handleEditChange} />
                      <input name="minOrder" value={editProduct.minOrder} onChange={handleEditChange} />
                      <input name="region" value={editProduct.region} onChange={handleEditChange} />
                      <button onClick={() => handleEditSave(i)}>Save</button>
                    </div>
                  ) : (
                    <>
                      <img src={prod.productPicture} alt={prod.productName} className="product-img-modern" />
                      <div className="product-main-info">
                        <h3 className="product-title-modern">{prod.productName}</h3>
                        <p className="product-desc-modern">{prod.productDescription}</p>
                        <div className="product-details-modern">
                          <div><span className="product-label">Category:</span> <span className="product-value">{prod.category}</span></div>
                          <div><span className="product-label">Region:</span> <span className="product-value">{prod.region}</span></div>
                          <div><span className="product-label">Size:</span> <span className="product-value">{prod.size}</span></div>
                          <div><span className="product-label">Min Order:</span> <span className="product-value">{prod.minOrder}</span></div>
                          <div><span className="product-label">Price:</span> <span className="product-value">₹{prod.price} per {prod.size}</span></div>
                        </div>
                        <div className="seller-details-modern">
                          <div><span className="product-label">Seller:</span> <span className="product-value">{prod.sellerName} {prod.sellerVerified && <span className="verified-badge">✔</span>}</span></div>
                          <div><span className="product-label">Email:</span> <span className="product-value">{prod.sellerEmail}</span></div>
                          <div><span className="product-label">Phone:</span> <span className="product-value">{prod.sellerPhone}</span></div>
                          <div><span className="product-label">Rating:</span> <span className="product-value">{prod.rating}★</span></div>
                        </div>
                        <button className="edit-btn-modern" onClick={() => handleEdit(i)}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          {tab === 'history' && (
            <div className="history-list-modern">No history available yet.</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile; 