const FaceRecogination = ({imageURL})=>{
    return (
        <div className='center ma'>
           <div className='absolute mt2'>
               <img src={imageURL} alt='img detect' id='inputImg' width='500px' height='auto' />
           </div>
        </div>
    );
}
export default FaceRecogination;