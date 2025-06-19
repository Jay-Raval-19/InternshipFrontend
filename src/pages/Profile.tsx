import React, { useState } from 'react';
import { ShoppingCart, Package, History, Mail, Building, CreditCard, MapPin, Phone, Pin, Building2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import './Profile.css';

const mockProfile = {
  profilePic: 'https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_512dp.png',
  fullName: 'Jay Raval',
  gmail: 'jay.mrugesh.raval@gmail.com',
  organization: 'Chemical Industries Ltd.',
  gst: '22AAAAA0000A1Z5',
  address: 'B-20, Industrial Area, Mumbai, Maharashtra',
  phone: '+91 9876543210',
  pin: '400001',
  company: 'Mumbai Chemical Solutions',
};

const mockBuyProducts = [
  'Acetic Acid',
  'Sulfuric Acid', 
  'Ammonia Solution',
  'Sodium Hydroxide',
  'Hydrochloric Acid'
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
    productPicture: 'https://via.placeholder.com/200x150/e5e7eb/9ca3af?text=Product+Image',
    sellerName: 'Varanasi Chem Supplies',
    sellerEmail: 'sales@varanasichem.com',
    sellerPhone: '9313456789',
    region: 'Uttar Pradesh',
    sellerVerified: true,
    rating: 4.8,
  },
  {
    productName: 'Ethyl Acetate',
    productDescription: 'High grade industrial solvent, 98% purity.',
    category: 'Industrial Chemicals',
    price: 150,
    size: '100 Kg',
    unit: 'Kg',
    minOrder: 200,
    productPicture: 'https://via.placeholder.com/200x150/e5e7eb/9ca3af?text=Product+Image',
    sellerName: 'Mumbai Chemical Solutions',
    sellerEmail: 'contact@mumbaichemicals.com',
    sellerPhone: '9876543210',
    region: 'Maharashtra',
    sellerVerified: true,
    rating: 4.7,
  },
];

const TABS = [
  { id: 'buy', label: 'Products You Buy', icon: ShoppingCart },
  { id: 'sell', label: 'Products You Sell', icon: Package },
  { id: 'history', label: 'History', icon: History },
];

interface ProfileProps {
  user?: {
    displayName?: string;
    email?: string;
    photoURL?: string;
    phone?: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [tab, setTab] = useState('buy');
  const [sellProducts, setSellProducts] = useState(mockSellProducts);
  const [editIdx, setEditIdx] = useState(-1);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [addressValue, setAddressValue] = useState(mockProfile.address);
  const [pinValue, setPinValue] = useState(mockProfile.pin);
  const [searchBuy, setSearchBuy] = useState('');
  const [searchSell, setSearchSell] = useState('');
  const [expandedSellIdx, setExpandedSellIdx] = useState<number | null>(null);

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

  const handleAddressEdit = () => setIsEditingAddress(true);
  const handleAddressSave = () => {
    setIsEditingAddress(false);
    // Optionally, update backend here
  };
  const handlePinEdit = () => setIsEditingPin(true);
  const handlePinSave = () => {
    setIsEditingPin(false);
    // Optionally, update backend here
  };

  // Use user data if available, otherwise fall back to mock data
  const displayName = user?.displayName || mockProfile.fullName;
  const email = user?.email || mockProfile.gmail;
  const profilePhoto = user?.photoURL;
  const userPhone = user?.phone || mockProfile.phone;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src={profilePhoto || 'https://www.gstatic.com/images/branding/product/2x/avatar_square_blue_512dp.png'} 
                alt="Profile" 
                className="profile-avatar-img"
              />
            </div>
            <h2 className="profile-name">{displayName}</h2>
            <p className="profile-company">{mockProfile.company}</p>
          </div>
          
          <div className="profile-info">
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <span className="info-label">EMAIL</span>
                <span className="info-value">{email}</span>
              </div>
            </div>
            <div className="info-item">
              <Building2 className="info-icon" />
              <div>
                <span className="info-label">COMPANY</span>
                <span className="info-value">{mockProfile.company}</span>
              </div>
            </div>
            <div className="info-item">
              <CreditCard className="info-icon" />
              <div>
                <span className="info-label">GST NUMBER</span>
                <span className="info-value">{mockProfile.gst}</span>
              </div>
            </div>
            
            <div className="info-item">
              <MapPin className="info-icon" />
              <div style={{width: '100%'}}>
                <span className="info-label">ADDRESS</span>
                <div className="profile-edit-row">
                  {isEditingAddress ? (
                    <>
                      <input
                        className="profile-edit-input"
                        value={addressValue}
                        onChange={e => setAddressValue(e.target.value)}
                        style={{marginRight: 8, width: '80%'}}
                      />
                      <button className="profile-edit-save" onClick={handleAddressSave}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className="info-value" style={{marginRight: 8}}>{addressValue}</span>
                      <button className="profile-edit-icon-btn" onClick={handleAddressEdit} title="Edit address">
                        <Edit size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="info-item">
              <Pin className="info-icon" />
              <div style={{width: '100%'}}>
                <span className="info-label">PIN CODE</span>
                <div className="profile-edit-row">
                  {isEditingPin ? (
                    <>
                      <input
                        className="profile-edit-input"
                        value={pinValue}
                        onChange={e => setPinValue(e.target.value)}
                        style={{marginRight: 8, width: '50%'}}
                      />
                      <button className="profile-edit-save" onClick={handlePinSave}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className="info-value" style={{marginRight: 8}}>{pinValue}</span>
                      <button className="profile-edit-icon-btn" onClick={handlePinEdit} title="Edit pincode">
                        <Edit size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Only show phone number if it exists */}
            {userPhone && (
              <div className="info-item">
                <Phone className="info-icon" />
                <div>
                  <span className="info-label">PHONE</span>
                  <span className="info-value">{userPhone}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="profile-main">
        <div className="profile-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <t.icon className="tab-icon" />
              {t.label}
            </button>
          ))}
        </div>
        
        <div className="tab-content">
          {tab === 'buy' && (
            <div className="buy-content">
              <input
                className="product-search-input"
                type="text"
                placeholder="Search products you buy..."
                value={searchBuy}
                onChange={e => setSearchBuy(e.target.value)}
                style={{marginBottom: 16, width: '100%'}}
              />
              <h2 className="section-title">Products You Have Bought</h2>
              <div className="buy-grid">
                {mockBuyProducts
                  .filter(product => product.toLowerCase().includes(searchBuy.toLowerCase()))
                  .map((product, i) => (
                    <div key={i} className="buy-item">
                      <Package className="buy-icon" />
                      <span>{product}</span>
                    </div>
                ))}
              </div>
            </div>
          )}
          
          {tab === 'sell' && (
            <div className="sell-content">
              <input
                className="product-search-input"
                type="text"
                placeholder="Search products you sell..."
                value={searchSell}
                onChange={e => setSearchSell(e.target.value)}
                style={{marginBottom: 16, width: '100%'}}
              />
              <h2 className="section-title">Products You Sell</h2>
              <div className="sell-grid">
                {sellProducts
                  .filter(product => product.productName.toLowerCase().includes(searchSell.toLowerCase()))
                  .map((product, i) => {
                    const isExpanded = expandedSellIdx === i;
                    return (
                      <div
                        key={i}
                        className={`sell-item-card${isExpanded ? ' expanded' : ''}`}
                        style={{ cursor: 'pointer', marginBottom: 16, border: '1px solid #eee', borderRadius: 8, boxShadow: isExpanded ? '0 2px 8px rgba(0,0,0,0.08)' : 'none', transition: 'box-shadow 0.2s' }}
                      >
                        <div 
                          style={{ display: 'flex', alignItems: 'center', padding: 16 }}
                          onClick={() => setExpandedSellIdx(isExpanded ? null : i)}
                        >
                          <Package className="buy-icon" />
                          <span style={{ flex: 1, marginLeft: 12, fontWeight: 600 }}>{product.productName}</span>
                          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                        {isExpanded && (
                          <div 
                            style={{ padding: 16, borderTop: '1px solid #eee', background: '#fafbfc' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="product-header">
                              {editIdx === i ? (
                                <input
                                  name="productName"
                                  value={editProduct.productName}
                                  onChange={handleEditChange}
                                  className="profile-edit-input"
                                  placeholder="Product Name"
                                  style={{fontWeight: 600, fontSize: '18px', marginBottom: 0}}
                                />
                              ) : (
                                <h3 className="product-name">{product.productName}</h3>
                              )}
                              <button className="edit-btn" onClick={() => handleEdit(i)}>
                                <Edit size={16} />
                              </button>
                            </div>
                            {editIdx === i ? (
                              <input
                                name="category"
                                value={editProduct.category}
                                onChange={handleEditChange}
                                className="profile-edit-input"
                                placeholder="Category"
                                style={{marginBottom: 8}}
                              />
                            ) : (
                              <p className="product-category">{product.category}</p>
                            )}
                            <div className="product-price">
                              {editIdx === i ? (
                                <input
                                  name="price"
                                  value={editProduct.price}
                                  onChange={handleEditChange}
                                  className="profile-edit-input"
                                  placeholder="Price"
                                  type="number"
                                  style={{width: 100, marginRight: 8}}
                                />
                              ) : (
                                <span className="price">₹{product.price}/Kg</span>
                              )}
                            </div>
                            {editIdx === i ? (
                              <textarea
                                name="productDescription"
                                value={editProduct.productDescription}
                                onChange={handleEditChange}
                                className="profile-edit-input"
                                placeholder="Product Description"
                                style={{marginBottom: 8, width: '100%', minHeight: 60}}
                              />
                            ) : (
                              <p className="product-description">{product.productDescription}</p>
                            )}
                            <div className="product-details">
                              <div className="detail-item">
                                <Package size={16} />
                                {editIdx === i ? (
                                  <input
                                    name="minOrder"
                                    value={editProduct.minOrder}
                                    onChange={handleEditChange}
                                    className="profile-edit-input"
                                    placeholder="Minimum Order Quantity"
                                    type="number"
                                    style={{width: 120}}
                                  />
                                ) : (
                                  <span>Min Order: {product.minOrder} Kg</span>
                                )}
                              </div>
                              <div className="detail-item">
                                <Package size={16} />
                                {editIdx === i ? (
                                  <input
                                    name="size"
                                    value={editProduct.size}
                                    onChange={handleEditChange}
                                    className="profile-edit-input"
                                    placeholder="Size"
                                    style={{width: 100}}
                                  />
                                ) : (
                                  <span>Size: {product.size}</span>
                                )}
                              </div>
                              <div className="detail-item">
                                <MapPin size={16} />
                                {editIdx === i ? (
                                  <input
                                    name="region"
                                    value={editProduct.region}
                                    onChange={handleEditChange}
                                    className="profile-edit-input"
                                    placeholder="Region"
                                    style={{width: 100}}
                                  />
                                ) : (
                                  <span>{product.region}</span>
                                )}
                              </div>
                            </div>
                            <div className="seller-info">
                              <h4>Seller Information</h4>
                              <div className="seller-name">
                                {product.sellerName} 
                                {product.sellerVerified && <span className="verified">✓ Verified</span>}
                              </div>
                              <div className="seller-contact">
                                <div><Phone size={14} /> {product.sellerPhone}</div>
                                <div><Mail size={14} /> {product.sellerEmail}</div>
                              </div>
                            </div>
                            {editIdx === i && (
                              <button className="profile-edit-save" style={{marginTop: 12}} onClick={() => handleEditSave(i)}>Save</button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
          
          {tab === 'history' && (
            <div className="history-content">
              <h2 className="section-title">History</h2>
              <p className="empty-state">No history available yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;