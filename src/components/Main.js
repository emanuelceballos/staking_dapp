import TetherLogo from '../tether_logo.png';
import { fromWei, toWei } from 'web3-utils';

function Main({stakingDappBalance, dummyTokenBalance, tetherTokenBalance, stakeTokensHandler, unstakeTokensHandler}) {

    const handleSubmit = (e) => {
        e.preventDefault();

        let etherAmount = document.getElementById('tetherAmount').value;
        let amount = toWei(etherAmount, 'ether');
        stakeTokensHandler(amount);
    };

    return(
        <>
            <table className='table table-borderless text-muted text-center'>
                <thead>
                    <tr>
                        <th scope='col'>Staking Balance</th>
                        <th scope='col'>Reward Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{fromWei(stakingDappBalance.toString(), 'ether')} mTether</td>
                        <td>{fromWei(dummyTokenBalance.toString(), 'ether')} Dummy token</td>
                    </tr>
                </tbody>
            </table>

            <div className='card-body'>
                <form className='mb-3' onSubmit={handleSubmit}>
                    <div>
                        <label className='float-left'><b>Stake Tokens</b></label>
                        <span className='float-right text-muted'>Balance: {fromWei(tetherTokenBalance.toString(), 'ether')}</span>
                    </div>

                    <div className='input-group mb-4'>
                        <input id="tetherAmount" type="text" className='form-control form-control-lg' placeholder='0' required></input>
                        <div className='input-group-append'>
                            <div className='input-group-text'>
                                <img src={TetherLogo} height='32px' alt='' />
                                &nbsp;&nbsp; mTether
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary btn-block btn-lg'>STAKE!</button>
                </form>
                <button type='submit' className='btn btn-link btn-block btn-sm' onClick={unstakeTokensHandler}>UN-STAKE...</button>
            </div>
        </>
    );
}

export default Main;