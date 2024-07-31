

export default function TableProducts({DUMMyPRODUCT,title,heandelEdite,heandelDelete }){
    const NewDUMMyPRODUCT=[...DUMMyPRODUCT];
    return <div id="table">
        <div id="titles" className="flex justify-between bg-white w-9/10 text-[var(--text-color)] p-1.5 px-2.5 my-5 border border-[#d7d7dc]">
        {[...title].map((item,index)=><h3 key={index}>{item}</h3>)}
        <h3 className="text-center w-[33%]">Action</h3>
        </div>     
       <div id="allProducts" className="bg-white w-[90%] max-h-[200px] overflow-hidden overflow-y-scroll p-1.5 px-2.5 border border-[#d7d7dc]">
        {NewDUMMyPRODUCT.map((item)=> (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: 'black', fontWeight: 800 }}>
        <div id="info" style={{ width: '65%', display: 'flex', justifyContent: 'space-between' }}>
        <p>{item.name}</p>
        <p>{item.price!==undefined && "$"+item.price}</p>
        <p>{item.stock_quantity}</p>
        </div>
          <div id="Button" style={{ display: 'flex', alignItems: 'center', gap: '25px' }} >
          <button onClick={()=>heandelEdite("open",item.id)}  style={{ width: '90px', height: '30px', outline: 'none', fontWeight: 600 ,backgroundColor: 'white', border: 'none', boxShadow: '0px 0px 4px 0px var(--text-color)'}}>Edit</button>
          <button onClick={()=>heandelDelete("open",item.id)}  style={{ width: '90px', height: '30px', outline: 'none', fontWeight: 600, backgroundColor: '#ffc2c2', color: '#d3414e', border: 'none', boxShadow: '0px 0px 4px 0px var(--text-color)' }}>Delete</button>
          </div>
        </div>)
        )}
    </div>
    </div>
      

}