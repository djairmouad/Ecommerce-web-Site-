import CartsDashboard from "../Components/CartsDashboard";
const DUMMYINFO_frirst=[ {title:"TODAY",num:2},
    {title:"THIS WEEK",num:2},
    {title:"THIS MONTH",num:2}
]
const DUMMYINFO_Seconde=[ 
    {title:"TODAY",num:2,price:85765},
    {title:"THIS WEEK",num:10,price:226600},
    {title:"THIS MONTH",num:40,price:1230093}
]

export default function Dashboard(){

    return(
        <div id="content-dashboard" className="font-cursive w-full ">
        <CartsDashboard title="Orders" DUMMYINFO={[...DUMMYINFO_frirst]}/>
        <CartsDashboard title="Revenue" price DUMMYINFO={[...DUMMYINFO_Seconde]}/>
        </div>
    )
}