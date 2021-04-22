import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onSubmittion})=>{
    return(
        <div>
            <p className="f3">This Smart Brain App Will Detect Faces In Your Pics</p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button onClick={onSubmittion} className='f4 link w-30 grow ph3 pv2 dib white bg-light-purple'>
                    Detect</button>
                </div>
            </div>
        </div>
    );
}
export default ImageLinkForm;