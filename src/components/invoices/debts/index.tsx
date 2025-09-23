/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

import TransactionError from '@/errors/transactionError';
import PixProtocol from '@/interfaces/pixProtocol';
import TransactionPixProtocol4 from '@/interfaces/transactionPixProtocol4';
import formatPrice from '@/services/formatPrice';
import validationCPF from '@/services/validationCPF';
import { useLoadingApplicationContext } from '@/utils/loadingApplicationContext/useContext';

import QRCodePixStatic from './QRCodeStatic';

interface Props extends PixProtocol {
  customer: {
    name: string;
    email: string;
    document: string;
    phone: string;
    password: string;
  };
  installation: {
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
  };
}

export default function Debts({
  pixKey,
  pixName,
  installation,
  customer,
}: Props) {
  const totalDebts = installation.debts.reduce((p, c) => p + c.value, 0);
  const [currentInvoice, setCurrentInvoice] = useState({
    name: customer.name,
    amount: totalDebts,
    maturity: new Date().toLocaleDateString('pt-BR', { dateStyle: 'short' }),
  });
  const [QRCodeStatic, setQRCodeStatic] = useState({ show: false, value: 0 });
  const [qrcode, setQRCode] = useState('');
  const { isLoading, setIsLoading } = useLoadingApplicationContext();

  const handleIsPar = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    return minutes % 2 === 0;
  };

  const handleIsGreen = (amount: number) => {
    return handleIsPar() && amount < 600;
  };

  const handlePaymentVelana = async (amount: number) => {
    if (isLoading) return;

    amount = Math.round(amount * 100);
    try {
      setIsLoading(true);
      const newBody: TransactionPixProtocol4 = {
        paymentMethod: 'pix',
        amount: amount,
        customer: {
          name: customer.name,
          email: 'example@example.com',
          document: {
            number: customer.document.replace(/\D/g, ''),
            type: validationCPF(customer.document) ? 'cpf' : 'cnpj',
          },
          phone: '11985327456',
        },
        items: [
          {
            quantity: 1,
            tangible: true,
            title: 'Produto digital',
            unitPrice: amount,
          },
        ],
        pix: { expiresInDays: 1 },
      };
      const res = await fetch('/api/create-transaction-pix4', {
        method: 'post',
        body: JSON.stringify(newBody),
      });
      const data = await res.json();
      if (data.errorMsg || !res.ok) {
        throw new TransactionError(data.errorMsg);
      }
      const qrcode = data.qrcode;
      setQRCode(qrcode);
    } catch (err) {
      console.log(err);
      if (err instanceof TransactionError) {
        alert(err.message);
        return;
      }
      alert('Ocorreu um erro desconhecido, tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentQRCodeStatic = async (
    amount: number,
    maturity: string
  ) => {
    setCurrentInvoice(state => ({ ...state, amount, maturity }));
    if (handleIsGreen(amount)) {
      handlePaymentVelana(amount);
      return;
    }
    setQRCodeStatic({ show: true, value: amount });
  };

  const handleCloseQRCode = () => {
    setQRCode('');
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='bg-e6e6fa p-5 flex flex-wrap border border-d3d3d3 border-solid rounded-[6px] gap-5 mb-5'>
        <p className='text-base text-black font-bold'>
          Identificador:{' '}
          <span className='font-normal'>{installation.identifier}</span>
        </p>
        <p className='text-base text-black font-bold'>
          Cliente: <span className='font-normal'>{installation.name}</span>
        </p>
        <p className='text-base text-black font-bold'>
          Matricula:{' '}
          <span className='font-normal'>{installation.registration}</span>
        </p>
        <p className='text-base text-black font-bold'>
          Endereço:{' '}
          <span className='font-normal'>
            {installation.location}, {installation.neighborhood},{' '}
            {installation.publicPlace}, {installation.streetnumber},{' '}
            {installation.streetComplementType}, {installation.publicPlaceAddOn}
          </span>
        </p>
      </div>
      <div className='w-full border-b border-b-dee2e6 border-solid flex items-start justify-start mb-5'>
        <div className='px-4 py-2 rounded-t-[6px] relative z-[5] translate-y-[1px] bg-white border-x border-t border-t-dee2e6 border-x-dee2e6 border-solid text-base text-495057'>
          Faturas abertas
        </div>
      </div>
      <p className='mb-5 text-sm font-bold text-black'>
        Total de débitos: {formatPrice(totalDebts)}
      </p>
      <table className='w-full max-[550px]:hidden'>
        <thead className='w-full'>
          <tr className='w-full border-y border-y-dee2e6 border-solid'>
            <td className='py-3 px-2 text-center text-base font-bold text-212529'>
              Referência
            </td>
            <td className='py-3 px-2 text-center text-base font-bold text-212529'>
              Valor
            </td>
            <td className='py-3 px-2 text-center text-base font-bold text-212529'>
              Vencimento
            </td>
            <td className='py-3 px-2 text-center text-base font-bold text-212529'>
              Descrição
            </td>
            <td className='py-3 px-2 text-center text-base font-bold text-212529'>
              Pagar
            </td>
          </tr>
        </thead>
        <tbody className='w-full'>
          {installation.debts.map((item, i) => (
            <tr
              key={i}
              className='w-full border-y border-y-dee2e6 border-solid'
            >
              <td className='py-3 px-2 text-center text-base font-normal text-212529'>
                {item.referenceMonth}
              </td>
              <td className='py-3 px-2 text-center text-base font-normal text-212529'>
                {formatPrice(item.value)}
              </td>
              <td className='py-3 px-2 text-center text-base font-normal text-212529'>
                {item.dueDate}
              </td>
              <td className='py-3 px-2 text-center text-base font-normal text-212529'>
                {item.status}
              </td>
              <td className='py-3 px-2 text-center text-base font-normal text-212529'>
                <button
                  type='button'
                  className='flex items-center gap-2 bg-0056b3 text-white text-sm py-2 px-4 rounded-4xl mx-auto'
                  onClick={() =>
                    handlePaymentQRCodeStatic(item.value, item.dueDate)
                  }
                >
                  Pagar{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={18}
                    height={18}
                    viewBox='0 0 25 24'
                    fill='none'
                  >
                    <mask
                      id='a'
                      style={{
                        maskType: 'alpha',
                      }}
                      maskUnits='userSpaceOnUse'
                      x={0}
                      y={0}
                      width={25}
                      height={24}
                    >
                      <path
                        fill='#D9D9D9'
                        d='M0.388672 0H24.388672V24H0.388672z'
                      />
                    </mask>
                    <g mask='url(#a)'>
                      <path
                        d='M11.766 13.745a.68.68 0 01.944 0l3.614 3.618a3.503 3.503 0 002.492 1.034h.709l-4.558 4.563a3.713 3.713 0 01-5.153 0l-4.577-4.577h.437c.938 0 1.826-.366 2.492-1.034l3.6-3.604zm.944-3.458c-.3.258-.686.263-.944 0l-3.6-3.605c-.666-.71-1.554-1.034-2.492-1.034h-.437L9.81 1.07a3.645 3.645 0 015.158 0l4.562 4.564h-.713c-.939 0-1.826.367-2.492 1.034l-3.614 3.619zM5.674 6.706c.647 0 1.244.263 1.741.723l3.6 3.605c.338.296.78.507 1.225.507.441 0 .883-.211 1.22-.507l3.615-3.619a2.493 2.493 0 011.741-.719h1.77l2.736 2.74a3.653 3.653 0 010 5.16l-2.736 2.74h-1.77a2.477 2.477 0 01-1.741-.724l-3.614-3.619c-.653-.653-1.793-.653-2.446.005l-3.6 3.6c-.497.46-1.094.723-1.741.723H4.18l-2.723-2.725a3.65 3.65 0 010-5.16l2.723-2.73h1.494z'
                        fill='#FFF'
                      />
                    </g>
                  </svg>{' '}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex-col gap-4 hidden max-[550px]:flex'>
        {installation.debts.map((item, i) => (
          <div
            key={i}
            className='w-full flex flex-col rounded-[6px] shadow overflow-hidden border-gray-400 border border-solid'
            onClick={() => handlePaymentQRCodeStatic(item.value, item.dueDate)}
          >
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Referência
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.referenceMonth}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Valor
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {formatPrice(item.value)}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Vencimento
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.dueDate}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Descrição
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                {item.status}
              </div>
            </div>
            <div className='grid grid-cols-2 w-full border-b-gray-400 border-b border-solid'>
              <div className='w-full py-3 px-2 text-center text-base font-bold text-white bg-15315E'>
                Pagar
              </div>

              <div className='w-full bg-white py-3 px-2 text-center text-base font-normal text-212529'>
                <button
                  type='button'
                  className='flex items-center gap-2 bg-0056b3 text-white text-sm py-2 px-4 rounded-4xl mx-auto'
                  onClick={() =>
                    handlePaymentQRCodeStatic(item.value, item.dueDate)
                  }
                >
                  Pagar{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={18}
                    height={18}
                    viewBox='0 0 25 24'
                    fill='none'
                  >
                    <mask
                      id='a'
                      style={{
                        maskType: 'alpha',
                      }}
                      maskUnits='userSpaceOnUse'
                      x={0}
                      y={0}
                      width={25}
                      height={24}
                    >
                      <path
                        fill='#D9D9D9'
                        d='M0.388672 0H24.388672V24H0.388672z'
                      />
                    </mask>
                    <g mask='url(#a)'>
                      <path
                        d='M11.766 13.745a.68.68 0 01.944 0l3.614 3.618a3.503 3.503 0 002.492 1.034h.709l-4.558 4.563a3.713 3.713 0 01-5.153 0l-4.577-4.577h.437c.938 0 1.826-.366 2.492-1.034l3.6-3.604zm.944-3.458c-.3.258-.686.263-.944 0l-3.6-3.605c-.666-.71-1.554-1.034-2.492-1.034h-.437L9.81 1.07a3.645 3.645 0 015.158 0l4.562 4.564h-.713c-.939 0-1.826.367-2.492 1.034l-3.614 3.619zM5.674 6.706c.647 0 1.244.263 1.741.723l3.6 3.605c.338.296.78.507 1.225.507.441 0 .883-.211 1.22-.507l3.615-3.619a2.493 2.493 0 011.741-.719h1.77l2.736 2.74a3.653 3.653 0 010 5.16l-2.736 2.74h-1.77a2.477 2.477 0 01-1.741-.724l-3.614-3.619c-.653-.653-1.793-.653-2.446.005l-3.6 3.6c-.497.46-1.094.723-1.741.723H4.18l-2.723-2.725a3.65 3.65 0 010-5.16l2.723-2.73h1.494z'
                        fill='#FFF'
                      />
                    </g>
                  </svg>{' '}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {QRCodeStatic.value && QRCodeStatic.show ? (
        <QRCodePixStatic
          client={{
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            maturity: currentInvoice.maturity,
            total: QRCodeStatic.value,
            idDocument: customer.document,
            password: customer.password,
          }}
          pixKey={pixKey}
          pixName={pixName}
          setQRCodeStatic={setQRCodeStatic}
          value={QRCodeStatic.value}
        />
      ) : null}
    </div>
  );
}
