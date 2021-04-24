const Navigation = ({ onRouteChange, isSignedIn })=>{
   if(isSignedIn){
       return (
        <nav style={{
            display:'flex',
            justifyContent: 'flex-end'
        }}>
            <p
             className='f3 pa3 dim pointer underline link black'
             onClick={ () => onRouteChange('signout') }
            >
                Sign Out
            </p>
        </nav>
       );
   }else{
        return(
            <nav style={{
                display:'flex',
                justifyContent: 'flex-end'
            }}>
                <p
                className='f3 pa3 dim pointer underline link black'
                onClick={ () => onRouteChange('signin') }
                >
                    Sign In
                </p>
                <p
                className='f3 pa3 dim pointer underline link black'
                onClick={ () => onRouteChange('register') }
                >
                    Register
                </p>
            </nav>
        );
   }
}
export default Navigation;


 