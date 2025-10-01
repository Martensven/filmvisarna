
import { Link } from "react-router";
//This child component is for the user checkout that's included in CheckoutComponent.


export default function UserOrderComponent(){
    

    return(
        <main className="container_box w-86 h-auto p-3 m-3">
            
            <p className="m-3">Ordernummer .... sparas och skickas till din mejl</p>
            <Link to={"/"}><button className="main_buttons w-30 h-8 m-3">Startsidan</button></Link>
            <Link to="/my-page"><button className="main_buttons w-30 h-8 m-3">Mina sidor</button></Link>
           
            
        </main>
    );
}