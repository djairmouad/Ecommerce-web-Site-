export default function Button({children,className,onClick}){
     
    return <button  onClick={onClick && (() => onClick())} className={` w-3/5 p-1 text-xg font-bold border-solid border-2  rounded-lg  ${className} `}>
       {children}
    </button>
}