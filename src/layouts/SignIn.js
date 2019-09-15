import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthenticationService } from 'services/AuthenticationService';
import SnackbarContent from "assets/jss/material-dashboard-react/components/snackbarContentStyle";

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));

export default function SignIn(props) {
  // redirect to home if already logged in
  if (AuthenticationService.currentSessionValue) { 
    props.history.push('/');
  }

  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    AuthenticationService.login(values.username, values.password)
      .then(user => {
        props.history.push("/");
      })
      .catch(error => {
        setSubmitting(false)
        if (!error) {
          setStatus('服务器错误，请稍后尝试！');
        } else {
          setStatus(error)
        }
      });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          登陆
        </Typography>
        {status &&
          <SnackbarContent
            fullWidth
            message={ '登陆失败 - ' + status }
            color="danger"
          />
        }
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={values.username}
            onChange={handleChange('username')}
            label="请输入微信号"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="请输入密码"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className={classes.submit}
          >
            登陆
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"没有帐号？注册"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}