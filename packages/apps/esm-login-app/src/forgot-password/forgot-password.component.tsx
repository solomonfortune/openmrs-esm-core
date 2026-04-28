import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, InlineLoading, InlineNotification, TextInput, Tile } from '@carbon/react';
import { ArrowRightIcon } from '@openmrs/esm-framework';
import Logo from '../logo.component';
import Footer from '../footer.component';
import { requestPasswordReset } from './forgot-password.resource';
import styles from '../login/login.scss';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      if (!username.trim()) return;

      setIsSubmitting(true);
      setErrorMessage('');
      await requestPasswordReset(username.trim());
      setIsSubmitting(false);
      setSubmitted(true);
    },
    [username],
  );

  return (
    <div className={styles.container}>
      <Tile className={styles.loginCard}>
        <div className={styles.center}>
          <Logo t={t} />
        </div>

        {errorMessage && (
          <div className={styles.errorMessage}>
            <InlineNotification
              kind="error"
              subtitle={errorMessage}
              title={t('error', 'Error')}
              onClick={() => setErrorMessage('')}
            />
          </div>
        )}

        {submitted ? (
          <div>
            <InlineNotification
              kind="success"
              title={t('forgotPasswordSuccessTitle', 'Request received')}
              subtitle={t(
                'forgotPasswordSuccessMessage',
                'If an account with that username exists, a password reset email has been sent.',
              )}
              hideCloseButton
            />
            <Button kind="ghost" onClick={() => navigate('/login')} style={{ marginTop: '1rem' }}>
              {t('backToLogin', 'Back to login')}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <p style={{ marginBottom: '1rem' }}>
                {t('forgotPasswordInstructions', 'Enter your username and we will send you a password reset link.')}
              </p>
              <TextInput
                id="forgot-password-username"
                type="text"
                name="username"
                labelText={t('username', 'Username')}
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                required
                autoFocus
              />
              <Button
                type="submit"
                className={styles.continueButton}
                renderIcon={(props) => <ArrowRightIcon size={24} {...props} />}
                iconDescription={t('submitRequest', 'Submit request')}
                disabled={isSubmitting || !username.trim()}
              >
                {isSubmitting ? (
                  <InlineLoading description={t('submitting', 'Submitting') + '...'} />
                ) : (
                  t('resetPassword', 'Reset password')
                )}
              </Button>
              <Button kind="ghost" onClick={() => navigate('/login')} style={{ marginTop: '0.5rem' }}>
                {t('backToLogin', 'Back to login')}
              </Button>
            </div>
          </form>
        )}
      </Tile>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
