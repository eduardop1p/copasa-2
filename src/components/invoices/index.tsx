/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { FormEvent, useState } from 'react';

import { cloneDeep } from 'lodash';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  installations: {
    _id: string;
    contactId: string;
    identifier: string;
    registration: string;
    location: string;
    neighborhood: string;
    publicPlace: string;
    streetnumber: string;
    streetComplementType: string;
    publicPlaceAddOn: string;
    CPFCNPJ: string;
    name: string;
    dateStartValidity: string;
    situation: string;
    debts: {
      _id: string;
      dueDate: string;
      referenceMonth: string;
      status: string;
      value: number;
    }[];
  }[];
  installationId: string;
  userId: string;
}

export default function Invoices({
  className,
  installations,
  installationId,
  userId,
}: Props) {
  const [stateInstallations, setStateInstallations] = useState(() =>
    cloneDeep(installations)
  );

  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value;
    value = value.replace(/[^0-9]/g, '');
    currentTarget.value = value;

    const newStateInstallations = installations.filter(item =>
      item.identifier.includes(value)
    );
    setStateInstallations(newStateInstallations);
  };

  return (
    <div className={twMerge('flex w-full flex-col', className)}>
      <div className='mb-4 flex w-full items-center justify-between gap-2 max-[620px]:flex-col-reverse max-[620px]:items-start'>
        <div className='flex w-full items-center gap-2'>
          <span className='text-base font-normal text-212529'>Pesquisar: </span>
          <input
            className='h-[31px] w-full rounded border border-solid border-ced4da bg-transparent px-3 py-[6px] text-base font-normal text-495057 transition-all duration-300 focus:border-80bdff focus:shadow-form-login-input'
            onInput={handleChangeInput}
            placeholder='Identificador'
          />
        </div>
      </div>
      <h2 className='mb-4 text-base font-bold text-15315e'>
        Selecione um Identificador*:
      </h2>
      <div className='mb-6 w-full overflow-auto max-[1200px]:hidden'>
        <div className='grid grid-cols-[30px_120px_120px_100px_100px_1fr_220px] w-full border-x border-t border-solid border-x-dee2e6 border-t-dee2e6'>
          <div className='w-full py-3 px-2 text-center'></div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            Identificador
          </div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            CPF/CNPJ
          </div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            Cliente
          </div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            Matrícula
          </div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            Endereço
          </div>
          <div className='whitespace-nowrap py-3 px-2 text-center text-base font-bold text-212529'>
            Data de inicio
          </div>
        </div>
        {stateInstallations.map((item, i) => (
          <a
            href={`/segunda-via/${userId}/${item._id}`}
            className='even:bg-f2f2f2 border border-dee2e6 border-solid cursor-pointer w-full grid grid-cols-[30px_120px_120px_100px_100px_1fr_220px]'
            key={i}
          >
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              <input
                type='radio'
                name='id'
                value={i}
                checked={installationId === item._id}
                className='h-4 w-4 cursor-pointer pointer-events-none'
                onChange={() => { }} // eslint-disable-line
              />
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.identifier}
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.CPFCNPJ}
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.name}
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.registration}
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.location}, {item.neighborhood}, {item.publicPlace},{' '}
              {item.streetnumber}, {item.streetComplementType},{' '}
              {item.publicPlaceAddOn}
            </div>
            <div className='w-full bg-inherit whitespace-nowrap py-3 px-2 text-center text-base font-normal text-212529'>
              {item.dateStartValidity}
            </div>
          </a>
        ))}
      </div>
      <div className='mb-6 w-full hidden max-[1200px]:flex flex-col gap-4'>
        {stateInstallations.map((item, i) => (
          <a
            href={`/segunda-via/${userId}/${item._id}`}
            className='even:bg-f2f2f2 border border-dee2e6 border-solid cursor-pointer w-full flex flex-col shadow rounded-[6px] overflow-hidden'
            key={i}
          >
            <div className='w-full bg-15315E py-3 px-2 text-center text-base font-normal text-white flex items-center justify-center gap-3 border-b-gray-400 border-b border-solid'>
              <span className='text-white text-base'>Selecionar</span>
              <input
                type='radio'
                name='id-mobile'
                value={i}
                checked={installationId === item._id}
                className='h-4 w-4 cursor-pointer pointer-events-none'
                onChange={() => { }} // eslint-disable-line
              />
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Identificador
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.identifier}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                CPF/CNPJ
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.CPFCNPJ}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Cliente
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.name}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Matrícula
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.registration}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Endereço
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.location}, {item.neighborhood}, {item.publicPlace},{' '}
                {item.streetnumber}, {item.streetComplementType},{' '}
                {item.publicPlaceAddOn}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Data de inicio
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.dateStartValidity}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className='mb-1 flex w-full items-center'>
        <span className='text-center text-base font-normal text-212529'>
          1 até {stateInstallations.length} registros
        </span>
      </div>
      <div className='flex w-fit items-center gap-5 self-end max-[500px]:self-center'>
        <a
          type='button'
          className='rounded border border-solid border-15315e px-3 py-[6px] text-base font-normal text-15315e transition-colors duration-300 hover:bg-gray-200'
          href='/'
        >
          Cancelar
        </a>
        <a
          href={`/segunda-via/${userId}/${installationId}`}
          className='rounded bg-15315e px-3 py-[6px] text-base font-normal text-white transition-colors duration-300 hover:bg-4e8cff'
        >
          Prosseguir
        </a>
      </div>
    </div>
  );
}
