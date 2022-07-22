import { useEffect, useState } from 'react';
import Web3 from 'web3';
import TetherToken from '../artifacts/contracts/TetherToken.json';
import DummyToken from '../artifacts/contracts/DummyToken.json';
import StakingDapp from '../artifacts/contracts/StakingDapp.json';
import Navbar from './Navbar';
import Main from './Main';

function App() {

    const [accountAddress, setAccountAddress] = useState('0x0');
    const [tetherToken, setTetherToken] = useState(null);
    const [tetherTokenBalance, setTetherTokenBalance] = useState(0);
    const [dummyToken, setDummyToken] = useState(null);
    const [dummyTokenBalance, setDummyTokenBalance] = useState(0);
    const [stakingDapp, setStakingDapp] = useState(null);
    const [stakingDappBalance, setStakingDappBalance] = useState(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        
        const loadBlockchainData = async () => {
            const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
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
        };

        loadBlockchainData();

    }, []);

    const stateTokens = (amount) => {
        setLoading(true);

        tetherToken.methods

            /// Request permissions to interact with the contract
            .approve(stakingDapp._address, amount)
            .send({from: accountAddress})
            .on('transactionHash', (hash) => {
                stakingDapp.methods
                    .stakeToken(amount)
                    .send({from: accountAddress})
                    .on('transactionHash', (hash) => {
                        setTetherTokenBalance(parseInt(tetherTokenBalance) - parseInt(amount));
                        setStakingDappBalance(parseInt(stakingDappBalance) + parseInt(amount));

                        setLoading(false);
                    })
                    .on('error', (error) => {
                        console.log(`Error unstaking tokens: ${error}`);
                        setLoading(false);
                    });
            });
    }

    const unstateTokens = () => {
        setLoading(true);

        stakingDapp.methods
            .unstakeTokens()
            .send({from: accountAddress})
            .on('transactionHash', (hash) => {
                setLoading(false);
            })
            .on('error', (error) => {
                console.log(`Error unstaking tokens: ${error}`);
                setLoading(false);
            });
    }

    return (
        <div className='container'>
            <Navbar
                accountAddress={accountAddress}
                loading={loading}
            />
            <Main
                dummyTokenBalance={dummyTokenBalance}
                stakingDappBalance={stakingDappBalance}
                tetherTokenBalance={tetherTokenBalance}
                stakeTokensHandler={stateTokens}
                unstakeTokensHandler={unstateTokens}
            />
        </div>
    );
}

export default App;
