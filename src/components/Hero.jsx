import avatar from "../assets/profile_pic.jpg"
import github from "../assets/github_icon.png"
import linkedin from "../assets/linkedIn_icon.png"
import twitter from "../assets/twitter_icon.png"
import instagram from "../assets/insta_icon.png"
import { setAlert, setGlobalState, useGlobalState } from "../store"
import { payToMint } from "../MetaMint"

const Hero = () => {
    const [nfts] = useGlobalState('nfts')
    const onMintNFT = async () => {
        setGlobalState('loading', {
            show: true,
            msg: 'Minting new NFT to your account'
        })

        await payToMint()
        .then(()=> setAlert('Minting Succcessful !!', 'green'))
        .catch(()=> setGlobalState('loading', {show: false, msg: ''}))
    }
    
  return (
    <div 
    className="bg-[url('https://cdn.pixabay.com/photo/2022/03/01/02/51/galaxy-7040416_960_720.png')] 
    bg-no-repeat bg-cover">

        <div className="flex flex-col justify-center items-center
        mx-auto py-10 ">
            <h1 className="text-white text-5xl font-bold text-center">
                A.I. <span className="text-gradient">Arts</span> <br/>
                <span className="text-gradient">NFTs</span> Collection
            </h1>
            <p className="text-white font-semibold text-sm mt-3">Mint and collect the Hottest NFTs around.</p>

            <button className="shadow-xl shadow-black text-white
            bg-[#e32979] hover:bg-[#bd255f] p-2 
            rounded-full cursor-pointer my-4"
            onClick={onMintNFT}
            >
                Mint Now
            </button>

            <a className="flex justify-center items center space-x-2
            bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer" href="https://github.com/AnjaneyaD12" target="_blank">
                <img className="w-11 h-11 object-contain rounded-full" src={avatar} alt="Avatar"/>
                <div className="flex flex-col font-semibold text-white text-sm">
                    <span>Hey There!</span>
                    <span className="text-[#e32970]">AnjaneyaD12</span>
                </div> 
            </a>

            <p className="text-white text-sm font-medium text-center">Myself Anjaneya Dwivedi, pursuing Electrical Engineering at NIT Bhopal.<br/> 
            Greetings! I'm a passionate developer with expertise in both blockchain and <br/> web development, 
            blending the best of both worlds to create groundbreaking projects.
            </p>

            <ul className="flex flex-row justify-center space-x-2
            items-center my-4">
                <a className="bg-white hover:scale-50 transition-all
                duration-75 delay-75 rounded-full mx-2" href="https://github.com/AnjaneyaD12">
                    <img className="w-7 h-7" src={github} alt="GitHub"/>
                </a>
                <a className="bg-white hover:scale-50 transition-all
                duration-75 delay-75 rounded-full mx-2"href="https://www.linkedin.com/in/anjaneya-dwivedi-0b755a201/">
                    <img className="w-7 h-7" src={linkedin} alt="LinkedIn"/>
                </a>
                <a className="bg-white hover:scale-50 transition-all
                duration-75 delay-75 rounded-full mx-2"href="https://twitter.com/_MainHoonNa_">
                    <img className="w-7 h-7" src={twitter} alt="Twitter"/>
                </a>
                <a className="bg-white hover:scale-50 transition-all
                duration-75 delay-75 rounded-full mx-2"href="https://www.instagram.com/__anjaney__/">
                    <img className="w-7 h-7" src={instagram} alt="Instagram"/>
                </a>
            </ul>

            <div className="shadow-xl shadow-black flex justify-center
            items-center w-10 h-10 rounded-full bg-white cursor-pointer
            p-3 ml-4 text-black hover:bg-[#bd255f] hover: text-white
            transition-all duration-75 delay-100">
                <span className="text-sm  text-black font-bold">{nfts.length}/99</span>
            </div>
        </div>
    </div>
  )
}

export default Hero
