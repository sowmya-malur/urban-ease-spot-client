function ConfirmParking({ handlePay, handleCancel }) {
return (
    <main>
        <p>Confirm Parking</p>
            <button onClick={handleCancel}>Cancel</button>
             <button onClick={handlePay}>Pay</button>
            
    </main>
    
);
}

export default ConfirmParking;