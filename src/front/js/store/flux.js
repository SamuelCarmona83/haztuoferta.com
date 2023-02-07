const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      notification: undefined,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      usuarios: [],
      favoritos: [],
      computadoras: [],
      computadora: [],
      celulares: [],
      celular: [],
      ofertas: [],
      searchText: "",
      searchResults: [],
      imageUrl: [],
      favoritos: [],
      imgSingleUrl: JSON.parse(sessionStorage.getItem("imageUrl")) || [],
    },

    actions: {
      // Use getActions to call a function within a fuction

      setSearchResults: (searchText, productType = undefined) => {
        const store = getStore();

        let productos = [];

        if (!productType) {
          productos = store.computadoras.concat(store.celulares);
        } else {
          productos = [...store[productType]];
        }

        let formatSearchText = searchText.toLowerCase();

        let results = productos.filter((product) =>
          product.titulo.includes(formatSearchText)
        );
        console.log(results);

        setStore({ searchResults: results });
      },

      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };

        try {
          const resp = await fetch(`api/token`, opts);
          if (resp.status !== 200) {
            const mensaje = await resp.json();
            alert(mensaje.msg);
            return false;
          }

          const data = await resp.json();
          console.log("Esto vino del backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("Hubo un error al hacer login in");
        }
      },
      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        console.log(
          "La aplicacion acaba de cargar, sincronizando el token de session storage"
        );
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      signup: async (name, lastname, phone, email, password) => {
        const store = getStore();
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            password: password,
          }),
        };

        try {
          const response = await fetch(`api/users`, options);

          if (!response.ok) {
            let danger = await response.json();
            alert(danger);
            return false;
          }

          const data = await response.json();
          console.log("This came from the backend", data);
          return true;
        } catch (error) {
          console.error("There has been an error login in");
        }
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        console.log("Se han borrado todos los tokens");
        setStore({ token: null });
      },

      addUrl: (url, thumbnail) => {
        const store = getStore();
        setStore({
          imageUrl: [...store.imageUrl, { url: url, thumbnail: thumbnail }],
        });
      },

      postImgurl: (data, productName, productId) => {
        console.log(data, productName, productId);
        const apiURL = `api/imgurl/${productName}/${productId}`;
        const store = getStore();
        for (const url of data) {
          fetch(apiURL, {
            method: "POST", // or 'POST'
            body: JSON.stringify({ url: url["url"] }), // data can be a `string` or  an {object} which comes from somewhere further above in our application
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (!res.ok) throw Error(res.statusText);
              return res.json();
            })
            .then((response) => {
              console.log("Success:", response);
            })
            .catch((error) => console.error(error));
          // console.log(url["url"]);
        }
        setStore({ imageUrl: [] });
      },

      getImgurl: (productName, productId) => {
        console.log(productName, productId);
        const apiURL = `api/imgurl/${productName}/${productId}`;
        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => {
            setStore({ imgSingleUrl: body });
            sessionStorage.setItem("imageUrl", JSON.stringify(body));
          })
          .catch((error) => console.log(error));
      },

      getUsuarios: () => {
        const apiURL = `api/users`;

        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ usuarios: body }))
          .catch((error) => console.log(error));
      },

      getComputadoras: () => {
        const apiURL = `api/get_computadoras`;

        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ computadoras: body }))
          .catch((error) => console.log(error));
      },

      getComputadoraId: (computadoraId) => {
        const apiURL = `api/get_computadora_id/${computadoraId}`;

        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ computadora: body }))
          .catch((error) => console.log(error));
      },

      postComputadoras: (data) => {
        const apiURL = `api/post_computadoras`;
        const store = getStore();
        const actions = getActions();
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + store.token,
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => {
            console.log("Success:", response);

            actions.getComputadoras();
          })
          .catch((error) => console.error(error));
      },

      postCelulares: (data) => {
        const apiURL = `api/post_celulares`;
        const store = getStore();
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + store.token,
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => console.log("Success:", response))
          .catch((error) => console.error(error));
      },

      getCelulares: async () => {
        const cellURL = `api/get_celulares`;

        try {
          let response = await fetch(cellURL);
          if (response.ok) {
            let body = await response.json();
            setStore({ celulares: body });
          } else if (response.status === 500) {
            console.log(response.status);
          }
        } catch (error) {
          console.log(error);
        }
      },

      getOfertas: () => {
        const apiURL = `api/get_ofertas_de_compras`;
        fetch(apiURL)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Ha ocurrido un error");
          })
          .then((body) => setStore({ ofertas: body }))
          .catch((error) => console.log(error));
      },

      postOfertas: (data) => {
        const apiURL = `api/post_ofertas_de_compras`;
        const store = getStore();
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + store.token,
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => console.log("Success:", response))
          .catch((error) => console.error(error));
      },

      postVentas: (data) => {
        const apiURL = `api/ofertas_de_compras`;
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => console.log("Success:", response))
          .catch((error) => console.error(error));
      },

      postIntercambios: (data) => {
        const apiURL = `api/ofertas_de_compras`;
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => console.log("Success:", response))
          .catch((error) => console.error(error));
      },

      postSubastas: (data) => {
        const apiURL = `api/ofertas_de_compras`;
        fetch(apiURL, {
          method: "POST", // or 'POST'
          body: JSON.stringify(data), // data can be a `string` or  an {object} which comes from somewhere further above in our application
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
          })
          .then((response) => console.log("Success:", response))
          .catch((error) => console.error(error));
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      setNotification: (mensaje) => {
        setStore({ notification: mensaje });
        setTimeout(() => {
          setStore({ notification: undefined });
        }, 10000);
      },
      toggleFavorite: (item) => {
        const store = getStore();
        const actions = getActions();
        if (actions.isFavorite(item)) {
          const newfavoritos = store.favoritos.filter((fav) => {
            return fav !== item;
          });
          setStore({
            favoritos: newfavoritos,
          });
        } else {
          setStore({
            favoritos: [...store.favoritos, item],
          });
        }
      },
      isFavorite: (name) => {
        const store = getStore();
        return store.favoritos.find((favoritos) => {
          return favoritos == name;
        });
      },
    },
  };
};

export default getState;
