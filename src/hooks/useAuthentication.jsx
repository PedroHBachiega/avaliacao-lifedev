import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateEmail,
    sendEmailVerification,
    FacebookAuthProvider,
    GithubAuthProvider,
    TwitterAuthProvider,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential
  } from 'firebase/auth'
  import { auth } from "../firebase/config"
  import { useState, useEffect } from "react"
  
  export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);
    const [message, setMessage] = useState(null);


  
    function checkIfIsCancelled() {
      if (cancelled) {
        return;
      }
    }
  
    const createUser = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(null);
  
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
  
        await updateProfile(user, {
          displayName: data.displayName,
        });

        if (data.sendVerification) {
          await sendEmailVerification(user);
          setMessage("Email de verificação enviado. Por favor, verifique sua caixa de entrada.");
        }
  
        return user;
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
  
        let systemErrorMessage;
  
        if (error.message.includes("Password")) {
          systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "E-mail já cadastrado.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };
  
    const logout = () => {
      checkIfIsCancelled();
  
      signOut(auth);
    };
  
    const login = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));
  
        let systemErrorMessage;
  
        if (error.message.includes("user-not-found")) {
          systemErrorMessage = "Usuário não encontrado.";
        } else if (error.message.includes("wrong-password")) {
          systemErrorMessage = "Senha incorreta.";
        } else {
          systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
  
        console.log(systemErrorMessage);
  
        setError(systemErrorMessage);
      }
  
      console.log(error);
  
      setLoading(false);
    };
  
    const loginWithGoogle = async () => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/popup-closed-by-user') {
          systemErrorMessage = "Login com Google cancelado pelo usuário.";
        } else {
          systemErrorMessage = "Erro ao fazer login com Google. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

    const loginWithFacebook = async () => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/popup-closed-by-user') {
          systemErrorMessage = "Login com Facebook cancelado pelo usuário.";
        } else {
          systemErrorMessage = "Erro ao fazer login com Facebook. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };


    const loginWithTwitter = async () => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        const provider = new TwitterAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/popup-closed-by-user') {
          systemErrorMessage = "Login com Twitter cancelado pelo usuário.";
        } else {
          systemErrorMessage = "Erro ao fazer login com Twitter. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

   
    const loginWithGithub = async () => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/popup-closed-by-user') {
          systemErrorMessage = "Login com GitHub cancelado pelo usuário.";
        } else {
          systemErrorMessage = "Erro ao fazer login com GitHub. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

 
    const resetPassword = async (email) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(null);
      setMessage(null);
  
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage("Email de recuperação enviado. Verifique sua caixa de entrada.");
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/user-not-found') {
          systemErrorMessage = "Usuário não encontrado.";
        } else {
          systemErrorMessage = "Erro ao enviar email de recuperação. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

  
    const updateUserProfile = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(null);
      setMessage(null);
  
      try {
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error("Nenhum usuário autenticado");
        }

      
        if (data.displayName || data.photoURL) {
          await updateProfile(user, {
            displayName: data.displayName || user.displayName,
            photoURL: data.photoURL || user.photoURL
          });
        }

      
        if (data.email && data.email !== user.email) {
          await updateEmail(user, data.email);
          setMessage("Perfil atualizado com sucesso. Verifique seu email para confirmar a alteração.");
        } else {
          setMessage("Perfil atualizado com sucesso.");
        }

        return user;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/requires-recent-login') {
          systemErrorMessage = "Esta operação é sensível e requer autenticação recente. Faça login novamente.";
        } else if (error.code === 'auth/email-already-in-use') {
          systemErrorMessage = "Este email já está em uso por outra conta.";
        } else {
          systemErrorMessage = "Erro ao atualizar perfil. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

 
    const verifyEmail = async () => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(null);
      setMessage(null);
  
      try {
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error("Nenhum usuário autenticado");
        }

        await sendEmailVerification(user);
        setMessage("Email de verificação enviado. Por favor, verifique sua caixa de entrada.");
      } catch (error) {
        console.log(error);
        setError("Erro ao enviar email de verificação. Tente novamente mais tarde.");
      }
  
      setLoading(false);
    };

   
    const deleteAccount = async (password) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(null);
      setMessage(null);
  
      try {
        const user = auth.currentUser;
        
        if (!user) {
          throw new Error("Nenhum usuário autenticado");
        }

       
        if (password) {
          const credential = EmailAuthProvider.credential(user.email, password);
          await reauthenticateWithCredential(user, credential);
        }

        await deleteUser(user);
        setMessage("Conta excluída com sucesso.");
        return true;
      } catch (error) {
        console.log(error);
        let systemErrorMessage;
  
        if (error.code === 'auth/requires-recent-login') {
          systemErrorMessage = "Esta operação é sensível e requer autenticação recente. Faça login novamente.";
        } else if (error.code === 'auth/wrong-password') {
          systemErrorMessage = "Senha incorreta.";
        } else {
          systemErrorMessage = "Erro ao excluir conta. Tente novamente mais tarde.";
        }
  
        setError(systemErrorMessage);
        return false;
      }
  
      setLoading(false);
    };
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return {
      auth,
      createUser,
      error,
      logout,
      login,
      loginWithGoogle,
      loginWithFacebook,
      loginWithTwitter,
      loginWithGithub,
      resetPassword,
      updateUserProfile,
      verifyEmail,
      deleteAccount,
      loading,
      message,
    };
  };