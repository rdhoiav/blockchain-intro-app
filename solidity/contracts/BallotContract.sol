pragma solidity ^0.8.0;

contract Ballot {
    //List of events
    event delegateVote(address indexed _from, address indexed _to);
    event voteName(address indexed _from, string proposalName);
    event proposalName(uint id, string name);

    struct Voter{
        uint weight;
        bool voted;
        address delegate;
        uint vote;
    }
    struct Proposal{
        string name;
        uint voteCount;
    }
    address public chairperson;

    mapping(address => Voter) public voters;

    Proposal[] public proposals;

    constructor(){

        string[3] memory proposalNames=["Oranges", "Apples", "Magoes"];
        chairperson = msg.sender;

        unchecked{voters[chairperson].weight-1;}

        for(uint i =0; i<proposalNames.length; i++){
            proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
            emit proposalName(i, proposalNames[i]);
        }
    }

    function giveRightToVote(address voter) public{
        require(msg.sender==chairperson, "Only chairperson can give right to vote");
        require(!voters[voter].voted, "The voter already voted");
        require(voters[voter].weight ==0);
        voters[voter].weight=1;
    }

    function delegate(address to) public{
        Voter storage sender = voters[msg.sender];
        require(!sender.voted,"you already voted");
        require(sender.weight!=0);

        require(to != msg.sender, "Self delegation is not allowed");
        while(voters[to].delegate != address(0)){
            to=voters[to].delegate;
            require(to != msg.sender, "Found loop in delegation");

        }

        sender.voted=true;
        sender.delegate=to;
        Voter storage delegate_=voters[to];
        if(delegate_.voted){
            proposals[delegate_.vote].voteCount += sender.weight;
        }
        else{
            delegate_.weight += sender.weight;
        }
        emit delegateVote(msg.sender, to);
    }

    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "has no right to vote");
        require(!sender.voted, "Already voted");
        sender.voted=true;
        sender.vote=proposal;
        proposals[proposal].voteCount += sender.weight;
        emit voteName(msg.sender, proposals[proposal].name);
    }

    function winningProposal() public view returns (uint winningProposal_){
        uint winingVoteCount = 0;

        for(uint p=0; p<proposals.length; p++){
            if(proposals[p].voteCount > winingVoteCount){
                winingVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnername() public view returns(string memory winnerName_){
        winnerName_=proposals[winningProposal()].name;
    }

}