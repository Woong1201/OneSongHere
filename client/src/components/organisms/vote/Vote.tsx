import SectionTitle from 'components/atoms/common/SectionTitle';
import { useEffect, useState } from 'react';
import './Vote.scss';
import { postRelayVote } from 'services/relayStudio';
import User from 'types/User';
import { RelayStudioInfo } from 'types/RelayStudio';

interface VoteProps {
  updateStudioInfo: (arg0: RelayStudioInfo) => void;
  currentId: number;
  status: number;
  vote: boolean;
  agree: number;
  numberOfVotes: number;
  relayStudioId: number;
}
const Vote = ({
  updateStudioInfo,
  currentId,
  status,
  vote,
  agree = 4,
  numberOfVotes = 4,
  relayStudioId,
}: VoteProps) => {
  const [doVote, setDoVote] = useState<boolean>(vote);
  const [voteAgree, setVoteAgree] = useState<number>(agree);
  const [totalVotes, setTotalVotes] = useState<number>(numberOfVotes);
  const [voteResult, setVoteResult] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserId((JSON.parse(storedUser) as User).userId);
    }
  }, []);

  const handleVoteChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    if (target.value === 'true') {
      setVoteResult(true);
    } else {
      setVoteResult(false);
    }
  };

  const agreePercentage = `${((voteAgree / totalVotes) * 100).toFixed(2)}%`;
  const disagreePercentage = `${(100 - (voteAgree / totalVotes) * 100).toFixed(
    2
  )}%`;

  const submitVote = () => {
    if (voteResult !== null) {
      postRelayVote(
        relayStudioId,
        voteResult,
        ({ data }) => {
          console.log(data);
          updateStudioInfo(data);
          setVoteAgree(data.agree);
          setTotalVotes(data.numberOfVotes);
        },
        (error) => {
          console.log('error', error);
        }
      );
      setDoVote(true);
    } else {
      alert('투표 항목을 선택해주세요.');
    }
  };

  const renderContent = () => {
    if (status === 3 && userId === currentId) {
      return <p className="vote__comment">투표가 진행중입니다.</p>;
    }
    if (status === 3 && userId !== currentId) {
      return (
        <>
          <div className="vote__title">
            <SectionTitle title="투표" />
          </div>
          {doVote ? (
            <div className="vote__result">
              <div
                className="vote__result__agree"
                style={{
                  background: `linear-gradient(90deg, #949494 ${agreePercentage}, #D9D9D9 ${agreePercentage})`,
                }}
              >
                <p>찬성</p>
                <p>({voteAgree})</p>
              </div>

              <div
                className="vote__result__disagree"
                style={{
                  background: `linear-gradient(90deg, #949494 ${disagreePercentage}, #D9D9D9 ${disagreePercentage})`,
                }}
              >
                <p>반대</p>
                <p>({totalVotes - voteAgree})</p>
              </div>
            </div>
          ) : (
            <div className="vote__form">
              <button
                className={`vote__form__choice ${
                  voteResult === true ? 'active' : ''
                }`}
                type="button"
                onClick={handleVoteChange}
                value="true"
              >
                찬성
              </button>
              <button
                className={`vote__form__choice ${
                  voteResult === false ? 'active' : ''
                }`}
                type="button"
                onClick={handleVoteChange}
                value="false"
              >
                반대
              </button>
              <button
                className="vote__form__submit"
                type="button"
                onClick={submitVote}
              >
                투표
              </button>
            </div>
          )}
        </>
      );
    }
    return <p className="vote__comment">진행중인 투표가 없습니다.</p>;
  };
  return (
    // status가 3이고 userId가 같지 않을 때에는 투표를 보여주고
    // status가 3이고 userId가 같을 때에는 투표중입니다를 보여주고
    // stutus가 3이 아니면 진행중인 투표가 없습니다를 보여줌

    <div className="vote">{renderContent()}</div>
  );
};

export default Vote;
