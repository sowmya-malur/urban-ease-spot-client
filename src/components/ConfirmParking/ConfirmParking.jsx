function ConfirmParking({ handlePay, handleCancel }) {
return (
    <main>
        <p>Confirm Parking</p>
             <button onClick={handlePay}>Pay</button>
            <button onClick={handleCancel}>Cancel</button>
    </main>
    
);
}

export default ConfirmParking;