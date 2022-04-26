import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tr,
  Th,
  Tbody,
} from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import React from 'react';
import BallotAbi from '../abi/BallotAbi.json';

function Table() {
  window.onload = function () {
    getvotes();
  };

  const adress = '0x26451fa2db8728974fA464ff95eB6056880Afd3E';

  async function getvotes() {
    const contractAddress = adress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress, BallotAbi, provider);

    //proposa0
    console.log(contract.address);
    console.log(await contract.chairperson());
    let proposal0 = await contract.proposals(0);
    console.log(proposal0[1].toString());

    let proposal0name = document.getElementById('candidate0name');
    let voteCount0 = document.getElementById('candidate0');

    proposal0name.innerHTML = proposal0[0];
    voteCount0.innerHTML = proposal0[1];

    //proposal1
    let proposal1 = await contract.proposals(1);
    console.log(proposal1[1].toString());

    let proposal1name = document.getElementById('candidate1name');
    let voteCount1 = document.getElementById('candidate1');

    proposal1name.innerHTML = proposal1[0];
    voteCount1.innerHTML = proposal1[1];

    //proposal2
    let proposal2 = await contract.proposals(2);
    console.log(proposal2[1].toString());

    let proposal2name = document.getElementById('candidate2name');
    let voteCount2 = document.getElementById('candidate2');

    proposal2name.innerHTML = proposal2[0];
    voteCount2.innerHTML = proposal2[1];
  }

  async function vote() {
    const contractAddress = adress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(0);

    const contract = new ethers.Contract(contractAddress, BallotAbi, signer);

    let proposalVal = document.getElementById('ProposalSelect').value;

    var castvote = contract.vote(proposalVal);
  }

  async function delegate() {
    const contractAddress = adress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(0);

    const contract = new ethers.Contract(contractAddress, BallotAbi, signer);

    let delegatevote = document.getElementById('Text1').value;

    contract.delegate(delegatevote);
  }

  async function giveVote() {
    const contractAddress = adress;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(0);

    const contract = new ethers.Contract(contractAddress, BallotAbi, signer);

    let giveVote = document.getElementById('give-vote').value;

    console.log(giveVote);

    contract.giveRightToVote(giveVote);
  }
  return (
    <React.Fragment>
      <TableContainer className='table-responsive'>
        <TableChakra variant='simple' className='table table-bordered'>
          <Thead>
            <Tr>
              <Th>Candidate</Th>
              <Th>Votes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <td id='candidate0name'></td>
              <td id='candidate0'></td>
            </Tr>
            <Tr>
              <td id='candidate1name'></td>
              <td id='candidate1'></td>
            </Tr>
            <Tr>
              <td id='candidate2name'></td>
              <td id='candidate2'></td>
            </Tr>
          </Tbody>
        </TableChakra>
      </TableContainer>
      <select id='ProposalSelect'>
        <option value='-1'>--Select a candidate to vote--</option>
        <option value='0'>Oranges</option>
        <option value='1'>Apples</option>
        <option value='2'>Mangoes</option>
      </select>
      <input
        type='button'
        onClick={vote}
        value='Vote'
        className='btn btn-info'
        id='Button1'
      />{' '}
      Or Delegate someone to vote
      <input type='text' name='' id='Text1' />
      <input
        type='button'
        value='Delegate'
        onClick={delegate}
        className='btn btn-info'
        id='Button1'
      />
      Give Vote
      <input type='text' name='' id='give-vote' />
      <input
        type='button'
        value='GiveVote'
        onClick={giveVote}
        className='btn btn-info'
        id='Button1'
      />
    </React.Fragment>
  );
}

export default Table;
