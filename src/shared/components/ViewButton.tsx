import { Button } from '@mantine/core';

type ViewButtonProps = {
  onClick: () => void;
};

export default function ViewButton({ onClick }: ViewButtonProps) {
    return <Button color="dark" onClick={onClick}>Смотреть вакансию</Button>

}