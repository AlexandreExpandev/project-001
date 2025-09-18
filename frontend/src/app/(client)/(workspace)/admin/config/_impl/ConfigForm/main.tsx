'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import * as configService from '@/services/config';
import type { ConfigFormState } from './types';
import { configFormVariant } from './variants';

const configSchema = z.object({
  min_range_setting: z.number({ invalid_type_error: 'O valor mínimo deve ser um número.' }),
  max_range_setting: z.number({ invalid_type_error: 'O valor máximo deve ser um número.' }),
}).refine(data => data.min_range_setting < data.max_range_setting, {
  message: 'O valor mínimo deve ser menor que o valor máximo.',
  path: ['min_range_setting'],
});

/**
 * @component ConfigForm
 * @description Formulário para configurar o intervalo de números do jogo.
 */
export const ConfigForm = () => {
  // #region States
  const [formState, setFormState] = useState<ConfigFormState>({ min_range_setting: 0, max_range_setting: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  // #endregion

  // #region Effects
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setMessage(null);
        const config = await configService.getConfig();
        setFormState(config);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Falha ao carregar a configuração.';
        setMessage({ text: errorMessage, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);
  // #endregion

  // #region Handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value === '' ? '' : parseInt(value, 10),
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const validation = configSchema.safeParse(formState);

    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      setMessage({ text: firstError, type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      await configService.updateConfig(validation.data);
      setMessage({ text: 'Configuração salva com sucesso!', type: 'success' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao salvar a configuração.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formState]);
  // #endregion

  // #region Styles
  const styles = configFormVariant({ messageType: message?.type });
  // #endregion

  // #region Renderers
  const renderContent = () => {
    if (isLoading) {
      return <p className={styles.message()}>Carregando configuração...</p>;
    }

    return (
      <form // form
        onSubmit={handleSubmit}
        className={styles.form()}
      >
        <div // fieldGroup
          className={styles.fieldGroup()}
        >
          <label // label
            htmlFor="min_range_setting"
            className={styles.label()}
          >
            Valor Mínimo
          </label>
          <Input
            nativeProps={{
              id: 'min_range_setting',
              name: 'min_range_setting',
              type: 'number',
              value: formState.min_range_setting,
              onChange: handleChange,
              disabled: isSubmitting,
            }}
          />
        </div>
        <div // fieldGroup
          className={styles.fieldGroup()}
        >
          <label // label
            htmlFor="max_range_setting"
            className={styles.label()}
          >
            Valor Máximo
          </label>
          <Input
            nativeProps={{
              id: 'max_range_setting',
              name: 'max_range_setting',
              type: 'number',
              value: formState.max_range_setting,
              onChange: handleChange,
              disabled: isSubmitting,
            }}
          />
        </div>
        <div // message
          className={styles.message()}
        >
          {message?.text}
        </div>
        <Button // submitButton
          nativeProps={{
            type: 'submit',
            disabled: isSubmitting,
          }}
          variant="primary"
          className="w-full"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Configuração'}
        </Button>
      </form>
    );
  };
  // #endregion

  return (
    <Card // wrapper
      className={styles.wrapper()}
    >
      <h1 // title
        className={styles.title()}
      >
        Configuração do Jogo
      </h1>
      {renderContent()}
    </Card>
  );
};
