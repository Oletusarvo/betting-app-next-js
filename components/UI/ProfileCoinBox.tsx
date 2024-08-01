import { ProfileCoin } from './ProfileCoin';
import { RoundedBox } from './RoundedBox';
import { TopLabel } from './TopLabel';

type ProfileCoinBoxProps = {
  coinContent: string;
  titleText: string;
  topLabelText: string;
  topLabelContent: React.ReactNode;
};

export function ProfileCoinBox({
  coinContent,
  titleText,
  topLabelText,
  topLabelContent,
}: ProfileCoinBoxProps) {
  return (
    <RoundedBox className='flex gap-4 items-center justify-between'>
      <ProfileCoin content={coinContent} />
      <div className='flex flex-col gap-2'>
        <h1 className='w-full text-right'>{titleText}</h1>

        <TopLabel labelText={topLabelText}>{topLabelContent}</TopLabel>
      </div>
    </RoundedBox>
  );
}
