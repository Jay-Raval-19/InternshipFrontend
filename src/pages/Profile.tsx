import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, History, Mail, Building, CreditCard, MapPin, Phone, Pin, Building2, Edit, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
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

const DUMMY_GST = '22AAAAA0000A1Z5';

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
  const [sellProducts, setSellProducts] = useState([]);
  const [buyProducts, setBuyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(true);
  const [editIdx, setEditIdx] = useState(-1);
  const [editProduct, setEditProduct] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [searchBuy, setSearchBuy] = useState('');
  const [searchSell, setSearchSell] = useState('');
  const [expandedSellIdx, setExpandedSellIdx] = useState<number | null>(null);
  
  // Add product modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [addingProduct, setAddingProduct] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Add sell product modal state
  const [showAddSellModal, setShowAddSellModal] = useState(false);
  const [sellProductForm, setSellProductForm] = useState([{
    productName: '',
    productCategory: 'Pharmaceutical',
    description: '',
    minimumQuantity: '',
    unit: 'Kg',
    customUnit: ''
  }]);
  const [addingSellProduct, setAddingSellProduct] = useState(false);

  // Fetch user's buy products from Pinecone
  useEffect(() => {
    const fetchBuyProducts = async () => {
      if (!user?.email) {
        console.log("No user email available");
        setBuyLoading(false);
        return;
      }

      console.log("Fetching buy products for email:", user.email);

      try {
        setBuyLoading(true);
        const response = await fetch(`/api/buy-products/${encodeURIComponent(user.email)}`);
        
        console.log("API response status:", response.status);
        console.log("API response ok:", response.ok);

        if (response.ok) {
          const data = await response.json();
          console.log("API response data:", data);
          
          if (data.success && Array.isArray(data.products)) {
            console.log("Setting buy products:", data.products);
            setBuyProducts(data.products);
          } else {
            console.log("No products array in response or success is false");
            setBuyProducts([]);
          }
        } else {
          console.error('Failed to fetch buy products, status:', response.status);
          const errorText = await response.text();
          console.error('Error response:', errorText);
          setBuyProducts([]);
        }
      } catch (error) {
        console.error('Error fetching buy products:', error);
        setBuyProducts([]);
      } finally {
        setBuyLoading(false);
      }
    };

    fetchBuyProducts();
  }, [user?.email]);

  // Fetch user's products from Pinecone
  useEffect(() => {
    const fetchUserProducts = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/suppliers/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.suppliers && Array.isArray(data.suppliers)) {
            // Transform the data to match the expected format
            const transformedProducts = data.suppliers.map(supplier => ({
              productName: supplier.productName || 'Unknown Product',
              productDescription: supplier.productDescription || 'No description available',
              category: supplier.productCategory || 'Uncategorized',
              price: supplier.productPrice || 0,
              size: supplier.productSize || 'N/A',
              unit: supplier.productUnit || 'Kg',
              minOrder: supplier.minimumOrderQuantity || 0,
              productPicture: supplier.productPictures || 'https://via.placeholder.com/200x150/e5e7eb/9ca3af?text=Product+Image',
              sellerName: supplier.sellerName || 'Unknown Seller',
              sellerEmail: supplier.sellerEmail || user.email,
              sellerPhone: supplier.sellerPOCContactNumber || 'N/A',
              region: supplier.region || 'Unknown Region',
              sellerVerified: supplier.sellerVerified || false,
              rating: supplier.sellerRating || 0,
            }));
            setSellProducts(transformedProducts);
          } else {
            setSellProducts([]);
          }
        } else {
          console.error('Failed to fetch user products');
          setSellProducts([]);
        }
      } catch (error) {
        console.error('Error fetching user products:', error);
        setSellProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [user?.email]);

  // Fetch real profile data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) {
        setProfileLoading(false);
        return;
      }
      setProfileLoading(true);
      try {
        const response = await fetch(`/api/profile/${encodeURIComponent(user.email)}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data.profile);
        } else {
          setProfileData(null);
        }
      } catch (error) {
        setProfileData(null);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [user?.email]);

  // Add new product function
  const handleAddProduct = async () => {
    console.log("handleAddProduct called with:", { newProductName, userEmail: user?.email });
    
    if (!newProductName.trim() || !user?.email) {
      console.log("Validation failed:", { newProductName: newProductName.trim(), userEmail: user?.email });
      return;
    }

    try {
      setAddingProduct(true);
      console.log("Making API call to add product:", { email: user.email, productName: newProductName.trim() });
      
      const response = await fetch('/api/buy-products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email, 
          productName: newProductName.trim() 
        }),
      });

      console.log("Add product response status:", response.status);
      console.log("Add product response ok:", response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Add product success data:", data);
        setBuyProducts(data.products);
        setNewProductName('');
        setShowAddModal(false);
      } else {
        const errorData = await response.json();
        console.error("Add product error:", errorData);
        alert(errorData.error || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setAddingProduct(false);
    }
  };

  // Remove product function
  const handleRemoveProduct = async (productName: string) => {
    if (!user?.email) return;

    try {
      const response = await fetch('/api/buy-products/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: user.email, 
          productName: productName 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBuyProducts(data.products);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
      alert('Failed to remove product');
    }
  };

  // Add more rows to sell product form
  const handleAddMoreSellProducts = () => {
    setSellProductForm([...sellProductForm, {
      productName: '',
      productCategory: 'Pharmaceutical',
      description: '',
      minimumQuantity: '',
      unit: 'Kg',
      customUnit: ''
    }]);
  };

  // Update sell product form data
  const handleSellProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...sellProductForm];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setSellProductForm(updatedProducts);
  };

  // Submit sell products
  const handleSubmitSellProducts = async () => {
    if (!user?.email) return;

    // Validate form
    const isValid = sellProductForm.every(product => 
      product.productName.trim() && 
      product.minimumQuantity.trim() && 
      (product.unit !== 'Other' || product.customUnit.trim())
    );

    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setAddingSellProduct(true);
      
      // For now, just add to local state (you can implement backend API later)
      const newProducts = sellProductForm.map(product => ({
        productName: product.productName,
        productDescription: product.description,
        category: product.productCategory,
        price: 0, // Default price
        size: `${product.minimumQuantity} ${product.unit === 'Other' ? product.customUnit : product.unit}`,
        unit: product.unit === 'Other' ? product.customUnit : product.unit,
        minOrder: parseInt(product.minimumQuantity),
        productPicture: 'https://via.placeholder.com/200x150/e5e7eb/9ca3af?text=Product+Image',
        sellerName: profileData?.["Seller Name"] || 'Unknown Seller',
        sellerEmail: user.email,
        sellerPhone: profileData?.["Seller POC Contact Number"] || 'N/A',
        region: profileData?.["Region"] || 'Unknown Region',
        sellerVerified: profileData?.["Seller Verified"] || false,
        rating: profileData?.["Seller Rating"] || 0,
      }));

      setSellProducts([...sellProducts, ...newProducts]);
      setShowAddSellModal(false);
      setSellProductForm([{
        productName: '',
        productCategory: 'Pharmaceutical',
        description: '',
        minimumQuantity: '',
        unit: 'Kg',
        customUnit: ''
      }]);
      
      alert('Products added successfully!');
    } catch (error) {
      console.error('Error adding sell products:', error);
      alert('Failed to add products');
    } finally {
      setAddingSellProduct(false);
    }
  };

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

  // Use profileData if available, otherwise fall back to mock data
  const displayName = profileData?.["Seller Name"] || user?.displayName || mockProfile.fullName;
  const email = profileData?.["Seller Email Address"] || user?.email || mockProfile.gmail;
  const profilePhoto = user?.photoURL;
  const userPhone = profileData?.["Seller POC Contact Number"] || user?.phone || mockProfile.phone;
  const company = profileData?.["Seller Name"] || mockProfile.company;
  const gstValue = DUMMY_GST;

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
            <p className="profile-company">{company}</p>
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
                <span className="info-value">{company}</span>
              </div>
            </div>
            <div className="info-item">
              <CreditCard className="info-icon" />
              <div>
                <span className="info-label">GST NUMBER</span>
                <span className="info-value">{gstValue}</span>
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
                        value={profileData?.["Seller Address"] || mockProfile.address}
                        onChange={e => {
                          // Handle address change
                        }}
                        style={{marginRight: 8, width: '80%'}}
                      />
                      <button className="profile-edit-save" onClick={handleAddressSave}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className="info-value" style={{marginRight: 8}}>{profileData?.["Seller Address"] || mockProfile.address}</span>
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
                        value={profileData?.["PIN Code"] || mockProfile.pin}
                        onChange={e => {
                          // Handle pin change
                        }}
                        style={{marginRight: 8, width: '50%'}}
                      />
                      <button className="profile-edit-save" onClick={handlePinSave}>Save</button>
                    </>
                  ) : (
                    <>
                      <span className="info-value" style={{marginRight: 8}}>{profileData?.["PIN Code"] || mockProfile.pin}</span>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <input
                  className="product-search-input"
                  type="text"
                  placeholder="Search products you buy..."
                  value={searchBuy}
                  onChange={e => setSearchBuy(e.target.value)}
                  style={{ width: '70%' }}
                />
                <button 
                  className="add-product-btn"
                  onClick={() => setShowAddModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>
              
              <h2 className="section-title">Products You Have Bought</h2>
              
              {buyLoading ? (
                <div className="loading-state">
                  <p>Loading your buy products...</p>
                </div>
              ) : buyProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found in your buy list.</p>
                  <p>Click "Add Product" to start adding chemicals you buy.</p>
                </div>
              ) : (
                <div className="buy-grid">
                  {buyProducts
                    .filter(product => product.toLowerCase().includes(searchBuy.toLowerCase()))
                    .map((product, i) => (
                      <div key={i} className="buy-item" style={{ position: 'relative' }}>
                        <Package className="buy-icon" />
                        <span style={{ flex: 1 }}>{product}</span>
                        <button
                          onClick={() => handleRemoveProduct(product)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            transition: 'background-color 0.2s'
                          }}
                          title="Remove product"
                        >
                          <X size={16} />
                        </button>
                      </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {tab === 'sell' && (
            <div className="sell-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <input
                  className="product-search-input"
                  type="text"
                  placeholder="Search products you sell..."
                  value={searchSell}
                  onChange={e => setSearchSell(e.target.value)}
                  style={{ width: '70%' }}
                />
                <button 
                  className="add-product-btn"
                  onClick={() => setShowAddSellModal(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <Plus size={16} />
                  Add Product
                </button>
              </div>
              
              <h2 className="section-title">Products You Sell</h2>
              
              {loading ? (
                <div className="loading-state">
                  <p>Loading your products...</p>
                </div>
              ) : sellProducts.length === 0 ? (
                <div className="empty-state">
                  <p>No products found for your account.</p>
                  <p>Products you add to the system will appear here.</p>
                </div>
              ) : (
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
              )}
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

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Product</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <label htmlFor="productName">Chemical Name:</label>
              <input
                id="productName"
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Enter chemical name (e.g., Acetic Acid)"
                className="modal-input"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddProduct();
                  }
                }}
              />
            </div>
            <div className="modal-footer">
              <button 
                className="modal-cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-submit-btn"
                onClick={handleAddProduct}
                disabled={!newProductName.trim() || addingProduct}
              >
                {addingProduct ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Sell Product Modal */}
      {showAddSellModal && (
        <div className="modal-overlay" onClick={() => setShowAddSellModal(false)}>
          <div className="modal-content sell-product-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90%', width: '1200px' }}>
            <div className="modal-header">
              <h3>Register Products</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowAddSellModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, marginBottom: '2rem', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #1A3556, #5DA8E0)', color: 'white' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Sr No</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Product Name</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Product Category</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Description</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Minimum Quantity</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.875rem' }}>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {sellProductForm.map((product, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa' }}>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>{index + 1}</td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <input
                          type="text"
                          value={product.productName}
                          onChange={(e) => handleSellProductChange(index, 'productName', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem' }}
                          placeholder="Product name"
                          required
                        />
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <select
                          value={product.productCategory}
                          onChange={(e) => handleSellProductChange(index, 'productCategory', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem' }}
                          required
                        >
                          <option value="Pharmaceutical">Pharmaceutical</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Agrochemical">Agrochemical</option>
                          <option value="Laboratory">Laboratory</option>
                        </select>
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <input
                          type="text"
                          value={product.description}
                          onChange={(e) => handleSellProductChange(index, 'description', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem' }}
                          placeholder="Description"
                        />
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <input
                          type="number"
                          value={product.minimumQuantity}
                          onChange={(e) => handleSellProductChange(index, 'minimumQuantity', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem' }}
                          placeholder="Min quantity"
                          min="1"
                          required
                        />
                      </td>
                      <td style={{ padding: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                        <select
                          value={product.unit}
                          onChange={(e) => handleSellProductChange(index, 'unit', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem' }}
                          required
                        >
                          <option value="Piece">Piece</option>
                          <option value="Dozen">Dozen</option>
                          <option value="Unit">Unit</option>
                          <option value="Cm">Cm</option>
                          <option value="Inch">Inch</option>
                          <option value="Feet">Feet</option>
                          <option value="Meter">Meter</option>
                          <option value="Gram">Gram</option>
                          <option value="Kg">Kg</option>
                          <option value="Tonne">Tonne</option>
                          <option value="Mtonne">Mtonne</option>
                          <option value="Litre">Litre</option>
                          <option value="Other">Other</option>
                        </select>
                        {product.unit === 'Other' && (
                          <input
                            type="text"
                            value={product.customUnit}
                            onChange={(e) => handleSellProductChange(index, 'customUnit', e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #B0B8C4', borderRadius: '0.5rem', fontSize: '1rem', marginTop: '0.5rem' }}
                            placeholder="Specify unit"
                            required
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-submit-btn"
                onClick={handleAddMoreSellProducts}
                style={{
                  backgroundColor: '#5DA8E0',
                  marginRight: '12px'
                }}
              >
                + Add More
              </button>
              <button 
                className="modal-cancel-btn"
                onClick={() => setShowAddSellModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-submit-btn"
                onClick={handleSubmitSellProducts}
                disabled={addingSellProduct}
              >
                {addingSellProduct ? 'Adding...' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;