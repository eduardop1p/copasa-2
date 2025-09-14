import { Dispatch, SetStateAction } from 'react';

import { Trash } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import deleteHits from '@/db/actions/hits/deleteHits';
import { useToast } from '@/hooks/use-toast';
import HitsProtocol from '@/interfaces/hitsProtocol';
import formatDateMedium from '@/services/formatDateMedium';
import { useLoadingContext } from '@/utils/loadingContext/useContext';

interface Props {
  className?: string;
  stHits: HitsProtocol[];
  setStHits: Dispatch<SetStateAction<HitsProtocol[]>>;
}

export default function Hits({ className, stHits, setStHits }: Props) {
  const { isLoading, setIsLoading } = useLoadingContext();
  const { toast } = useToast();

  const handleDeleteHits = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await deleteHits({ query: {} });
      toast({
        title: 'Acessos foram excluidos com sucesso.',
        description: formatDateMedium(),
      });
      setStHits([]);
    } catch {
      toast({
        title: 'Ocorreu um erro, tente novalmente.',
        description: formatDateMedium(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={twMerge('w-full flex flex-col gap-4', className)}>
      <div className='w-full overflow-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>País</TableHead>
              <TableHead className='whitespace-nowrap'>Estado</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead className='whitespace-nowrap'>CEP</TableHead>
              <TableHead className='whitespace-nowrap'>Horário</TableHead>
              <TableHead className='whitespace-nowrap'>IP</TableHead>
              <TableHead>ISP</TableHead>
              <TableHead>Hostname</TableHead>
              <TableHead className='whitespace-nowrap'>Loc</TableHead>
              <TableHead className='whitespace-nowrap'>Time zone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stHits.map((item, i) => (
              <TableRow key={i}>
                <TableCell className='whitespace-nowrap'>
                  {item.country || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.region || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.city || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.postal || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {new Date(item.createdIn).toLocaleString('pt-BR', {
                    dateStyle: 'long',
                    timeStyle: 'medium',
                  }) || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.ip || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.org || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.hostname || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.loc || '-'}
                </TableCell>
                <TableCell className='whitespace-nowrap'>
                  {item.timezone || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h2 className='text-center text-sm text-5e5e5e'>
        Uma lista dos últimos 10 acessos ao painel.
      </h2>
      {stHits.length > 0 && (
        <Button
          title='Limpar acessos'
          className='fixed z-10 right-4 bottom-4 rounded-full overflow-hidden flex-none w-[50px] h-[50px] group'
          onClick={handleDeleteHits}
        >
          <Trash className='!w-5 !h-5 !text-inherit group-hover:!text-red-500 group-hover:scale-105 transition-all duration-200' />
        </Button>
      )}
    </div>
  );
}
