import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import TetherToken from './artifacts/contracts/TetherToken.json';
import DummyToken from './artifacts/contracts/DummyToken.json';
import StakingDapp from './artifacts/contracts/StakingDapp.json';

function App() {

    const [accountAddress, setAccountAddress] = useState(null);
    const [tetherToken, setTetherToken] = useState(null);
    const [tetherTokenBalance, setTetherTokenBalance] = useState(0);
    const [dummyToken, setDummyToken] = useState(null);
    const [dummyTokenBalance, setDummyTokenBalance] = useState(0);
    const [stakingDapp, setStakingDapp] = useState(null);
    const [stakingDappBalance, setStakingDappBalance] = useState(0);
    
    useEffect(() => {
        
        /// Standard connection to Web3
        ///
        const loadWeb3 = async () => {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
            } else if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                window.alert('Non-Ethereum browser detected. Consider trying Metamask.');
            }
        }
        
        const loadBlockchainData = async () => {
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();
            
            setAccountAddress(accounts[0]);
    
            const networkId = await web3.eth.net.getId();
    
            const tetherTokenData = TetherToken.networks[networkId];
    
            if(tetherTokenData) {
                const tetherTokenContract = new web3.eth.Contract(TetherToken.abi, tetherTokenData.address);

                setTetherToken(tetherTokenContract);
    
                let tetherBalance = await tetherTokenContract.methods.balance(accounts[0]).call();
    
                setTetherTokenBalance(tetherBalance);
            }

            const dummyTokenData = DummyToken.networks[networkId];
    
            if(dummyTokenData) {
                const dummyTokenContract = new web3.eth.Contract(DummyToken.abi, dummyTokenData.address);

                setDummyToken(dummyTokenContract);
    
                let dummyBalance = await dummyTokenContract.methods.balance(accounts[0]).call();
    
                setDummyTokenBalance(dummyBalance);
            }

            const stakingDappData = StakingDapp.networks[networkId];
    
            if(stakingDappData) {
                const stakingDappContract = new web3.eth.Contract(StakingDapp.abi, stakingDappData.address);

                setStakingDapp(stakingDappContract);
    
                let stakingBalance = await stakingDappContract.methods.stakingBalance(accounts[0]).call();
    
                setStakingDappBalance(stakingBalance);
            }
        }

        loadWeb3();
        loadBlockchainData();

    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>Edit <code>src/App.js</code> and save to reload.</p>
                <a className="App-link" href="https://reactjs.org"
                target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
