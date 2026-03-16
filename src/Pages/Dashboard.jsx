import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../Style/Dashboard.css";
function Card({title, data,persentage,flage}) {
if(flage==true){
  return ( 
       <div className="card">
        <h4>{title}</h4>
        <p>{data}</p>
        <p style={{backgroundColor:"green",width:"200px",height:"50px",textAlign:"center",paddingTop:"10px"}}>{persentage}% vs last month</p>

        </div>   
  );
}
if(flage==false){
  return ( 
       <div className="card">
        <h4>{title}</h4>
        <p style={{backgroundColor:"red",width:"200px",height:"50px",textAlign:"center",paddingTop:"10px"}}>{data}</p>
        </div>   
  );
}
if(!data){
  return ( 
       <div className="card">
        <h4>{title}</h4>
        </div>   
  );
}
}


function RevenueBox({children}) {
  return (
    <div className="box">
      <h3>Revenue</h3>
      {children}
    </div>
  );
}

function ProductBox({children}) {
  return (
    <div className="box">
      <h3>Top Products</h3>
      {children}
    </div>
  );
}

function CategoryBox({children}) {
  return (
    <div className="box">
      <h3>Category</h3>
      {children}
    </div>
  );
}

function OrderBox({children}) {
  return (
    <div className="box">
      <h3>Recent Orders</h3>
      {children}
    </div>
  );
}

function StockBox({children}) {
  return (
    <div className="box">
      <h3>Stock Alerts</h3>
      {children}
    </div>
  );
}

function Dashboard() {

  return (
    <div className="dashboard">

      <Navbar/>

      <div className="container">

     
        <div className="sidebar">


          <p className="title">OVERVIEW</p>

          <div className="menu">Dashboard</div>
          <div className="menu">Analytics</div>

          <p className="title">COMMERCE</p>

          <div className="menu">Orders</div>
          <div className="menu">Products</div>
          <div className="menu">Inventory</div>
          <div className="menu">Customers</div>

          <p className="title">MANAGE</p>

          <div className="menu">Discounts</div>
          <div className="menu">Marketing</div>
          <div className="menu">Settings</div>

        </div>

        <div className="main">

          <div className="cards">

            <Card title="Total Revenue" />
            <Card title="Total Orders"  data={400} persentage={1.2} flage={true} />
            <Card title="New Customers" />
            <Card title="Return Rate"  />
          </div>
          <div className="middle">
            <RevenueBox>
            </RevenueBox>
            <ProductBox>
            </ProductBox>
          </div>
          <div className="bottom">
            <CategoryBox>
            </CategoryBox>
            <OrderBox>
            </OrderBox>
            <StockBox>
            </StockBox>
          </div>

        </div>

      </div>

      <Footer/>

    </div>
  );
}

export default Dashboard;