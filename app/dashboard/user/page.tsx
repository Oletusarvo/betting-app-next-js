import { Main } from '@/components/UI/Main';
import { UserPageTabs } from './UserPageTabs';
import { UserCreatedBets } from './UserCreatedBets';
import { UserParticipatedBets } from './UserParticipatedBets';

export default async function UserPage() {
  return (
    <main className='flex flex-col gap-2 px-1 pb-20'>
      <UserPageTabs
        betsCreatedContent={<UserCreatedBets />}
        betsParticipatedInContent={<UserParticipatedBets />}
      />
    </main>
  );
}
