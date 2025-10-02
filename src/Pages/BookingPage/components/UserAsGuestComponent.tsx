
//This child component is for the guest checkout that's included in CheckoutComponent.
export default function UserAsGuest() {
  return (
    <main className="container_box w-86 h-auto p-3 m-3">
      <p className="m-3">Genomför beställning:</p>
        <div className="w-86 h-auto p-5">
          <input className="w-3/5 m-2" type="text" name="" id="" placeholder="Ange e-post" />
          <button className="main_buttons w-20 h-8">Beställ</button>
        </div>
    </main>
  );
}
