const { contextBridge, ipcRenderer } = require('electron')
let env;
let loginPromise;

const login = (user_name, password) => {
    loginPromise = new Promise ((resolve, reject) => {
        ipcRenderer.invoke('user:login', {
            user_name: user_name,
            password: password
        }).then((res) => {
            //console.log('res', res);
            if  ( res.result == 'OK' ) {
                env.user = user_name;
                env.serverSpecs = res.specs;
                //console.log('env(preload.js)', env);
                resolve();
            } else {
                env.user = undefined;
                reject(res.message);
            }
        }).catch((e) => {
            console.log(e);
            env.user = undefined;
            reject('other error');
        });
    });
    return  (loginPromise);
}
const logout = () => {
    return new Promise ((resolv, reject) => {
        ipcRenderer.invoke('user:logout').then((res) => {
            //console.log('preload.js logout', res);
            resolv();
        }).catch ((e) => {
            console.log('preload.js logout reject');
            reject();
        });
    });
}
const signup = (user_name, password, mail) => {
    return new Promise ((resolve, reject) => {
        ipcRenderer.invoke('user:signup', {
            user_name: user_name,
            password: password,
            mail: mail
        }).then((res) => {
            //console.log('res(preload.js)', res);
            if  ( res.result == 'OK' )  {
                resolve();
            } else {
                reject(res.message);
            }
        }).catch((e) => {
            console.log(e);
            reject('other error(preload.js)');
        });
    });
}

const password = (old_pass, new_pass) => {
    return new Promise((resolve, reject) => {
        try {
            ipcRenderer.invoke('user:password', {
                currentPassword: old_pass,
                newPassword: new_pass 
            }).then((res) => {
                if  ( res.result == 'OK' )    {
                    resolve();
                } else {
                    reject();
                }
            }).catch((e) => {
                reject();
            });
        } catch (e) {
            reject();
        }
    });
}
const getUser = ()  => {
    //console.log('preload.js getUser');
    return new Promise ((resolve, reject) => {
        loginPromise.then(() => {
            //console.log('user:get');
            ipcRenderer.invoke('user:get').then((res) => {
                //console.log('getUser', {res});
                resolve(res);
            }).catch((e) => {
                reject();
            });
        });
    });
}

const putUser = (user) => {
    return new Promise ((resolve, reject) => {
        loginPromise.then(() => {
            ipcRenderer.invoke('user:put', user).then((res) => {
                if  ( res.result === 'OK' ) {
                    resolve();
                } else {
                    reject();
                }
            }).catch((e) => {
                reject();
            });
        });
    });
}
const getProfiles = ()  => {
    return new Promise ((resolve, reject) => {
        loginPromise.then(() => {
            ipcRenderer.invoke('profiles').then((res) => {
                //console.log('res', res);
                resolve(res);
            }).catch((e) => {
                console.log('getProfiles', e);
                reject();
            });
        });
    });
}

const updateProfile = (profile) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('profile:update', {
            profile: profile
        }).then((res) => {
            if  ( res.result == 'OK' )    {
                resolve();
            } else {
                reject(res.message);
            }
        }).catch((e) => {
            console.log(e);
            reject('other error');
        });
    });
}
const deleteProfile = (profile_id) => {
    return new Promise((resolve, reject) => {
		ipcRenderer.invoke('profile:delete', {
            profile_id: profile_id
        }).then((res) => {
			resolve();
		}).catch((e) => {
		    console.log(e);
            reject(e);
		    // can't delete
		    //	TODO alert
	    });
    });
}

const setConf = (conf) => {
    return new Promise((resolve, reject) => {
        if  ( conf )    {
            if  ( conf.host )   {
                env.host = conf.host;
            }
            if  ( conf.port )   {
                env.port = conf.port;
            }
            if  ( conf.user )   {
                env.user = conf.user;
            }
            if  ( conf.password )   {
                env.password = conf.password;
            }
            if  ( conf.profiles )   {
                env.profiles = conf.profiles;
            }
            if  ( conf.webServer )  {
                env.webServer = conf.webServer;
            }
            ipcRenderer.invoke('env:set', env).then((res) => {
                resolve(env);
            });
        } else {
            ipcRenderer.invoke('env:set').then((res) => {
                resolve(env);
            });
        }
    })
};
const getConf = () => {
    return new Promise((resolve, reject) => {
        //console.log('getConf(before call)');
        ipcRenderer.invoke('env:get').then((res) => {
            //console.log('getConf(preload.js', res);
            env = res;
            resolve(env);
        })
    })
}

const startProxy = (profile_name, port) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('proxy:start', {
            profile: profile_name,
            localPort: port
        }).then((res) => {
            resolve(res.data);
        });
    });
}
const stopProxy = (profile) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('proxy:stop', {
            profile: profile
        }).then((res) => {
            resolve(res.data);
        });
    });
}

const checkProxy = (profile) => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('proxy:check', {
            profile: profile
        }).then((res) => {
            //console.log({res});
            resolve(res);
        });
    });
}

const openDialog = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('dialog:open').then((res) => {
            //console.log('path', res.filePaths[0]);
            resolve(res.filePaths[0]);
        });
    });
}

const startWebServer = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('web-server:start').then((res) => {
            resolve();
        }).catch((e) => {
            reject();
        })
    })
}
const stopWebServer = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('web-server:stop').then((res) => {
            resolve();
        }).catch((e) => {
            reject();
        })
    })
}
const checkWebServer = () => {
    return new Promise((resolve, reject) => {
        ipcRenderer.invoke('web-server:check').then((res) => {
            //console.log({res});
            resolve(res);
        }).catch((e) => {
            reject();
        })
    })
}

const init = () => {
    //console.log('env', env);
    getConf().then((_env) => {
        env = _env;
        contextBridge.exposeInMainWorld('api', {
            login: login,
            logout: logout,
            signup: signup,
            password: password,
            getUser: getUser,
            putUser: putUser,
            getProfiles: getProfiles,
            updateProfile: updateProfile,
            deleteProfile: deleteProfile,
            setConf: setConf,
            getConf: getConf,
            startProxy: startProxy,
            stopProxy: stopProxy,
            checkProxy: checkProxy,
            openDialog: openDialog,
            startWebServer: startWebServer,
            stopWebServer: stopWebServer,
            checkWebServer: checkWebServer
        });
        contextBridge.exposeInMainWorld('env', env);
    });
    //console.log('init');
}

init();
