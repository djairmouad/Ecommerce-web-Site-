
export default function Carts({DUMMYINFO,price}){
    const newDummyInfo=[...DUMMYINFO];

return <>
    {newDummyInfo.map((item,index)=> <div key={index} id="cart" className="text-center w-3/10 h-1/4 bg-white shadow-[1px_3px_4px_0px_var(--text-color)]">
        <h1 id="title" style={{fontSize: "18px" , margin: "10px"}}>{item.title}</h1>
        <h1 id="num" className="text-[30px] m-2.5 text-[var(--second-color)]">{price? "$ "+item.price:item.num}</h1>
        <h1 id="description" className="text-base m-2.5 text-[var(--text-color)]">{item.num} orders {item.title}</h1>
     </div>
     
     )}
</>
    
}