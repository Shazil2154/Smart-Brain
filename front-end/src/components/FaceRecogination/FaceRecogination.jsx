import './FaceRecogination.css';
const FaceRecogination = ({imageURL, box})=>{
    return (
        <div className='center ma'>
           <div className='absolute mt2'>
               <img src={imageURL} alt='img detect' id='inputImg' width='500px' height='auto' />
               <div className='bounding-box' style={{
                   left: box.leftCol,
                   right: box.rightCol,
                   top: box.topRow,
                   bottom: box.bottomRow
               }}></div>
           </div>
        </div>
    );
}
export default FaceRecogination;