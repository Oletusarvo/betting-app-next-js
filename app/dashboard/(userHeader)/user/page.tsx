import { Main } from '@/components/UI/Main';
import { UserPageTabs } from './UserPageTabs';
import { UserCreatedBets } from './UserCreatedBets';
import { UserParticipatedBets } from './UserParticipatedBets';

export default async function UserPage() {
  return (
    <div className='flex flex-col gap-2'>
      <UserPageTabs
        betsCreatedContent={<UserCreatedBets />}
        betsParticipatedInContent={<UserParticipatedBets />}
      />
    </div>
  );
}
