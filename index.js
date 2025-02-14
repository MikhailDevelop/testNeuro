document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.querySelector(".slider-container");
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const addBtn = document.querySelector(".add");
    const turn_img = document.querySelector(".turn");
    const turn_img_2 = document.querySelector(".turn_2");
    const cardCountSelect = document.querySelector("#card-count");
    let users = [];
    let visibleCards = 3;
    let currentIndex = 0;

    async function fetchUsers() {
        try {
            const response = await fetch("https://reqres.in/api/users");
            const data = await response.json();
            users = data.data;
            renderSlider();
        } catch (error) {
            console.error("Ошибка загрузки данных", error);
        }
    }

    function renderSlider() {
        sliderWrapper.innerHTML = "";
        users.forEach(user => addCard(user));
        updateSlider();
    }

    function addCard(user) {
        const card = document.createElement("div");
  
        card.innerHTML = `
          <div class='card'>
            <img src="${user.avatar}" alt="${user.first_name}">
            <h3>${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
            <button class="remove">Удалить</button>
         </div>
        `;
        card.querySelector(".remove").addEventListener("click", () => removeCard(user.id));
        sliderWrapper.appendChild(card);
    }

    function updateSlider() {
        const cardWidth = sliderContainer.clientWidth / visibleCards;
        document.querySelectorAll(".card").forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
        sliderWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function removeCard(id) {
        users = users.filter(user => user.id !== id);
        renderSlider();
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < users.length - visibleCards) {
            currentIndex++;
            updateSlider();
            
        }
    });

    addBtn.addEventListener("click", () => {
        const newUser = {
            id: Date.now(),
            first_name: "Новый",
            last_name: "Пользователь",
            email: "new.user@example.com",
            avatar: "https://via.placeholder.com/150"
        };
        users.push(newUser);
        addCard(newUser);
        updateSlider();
    });

    cardCountSelect.addEventListener("change", (e) => {
        visibleCards = parseInt(e.target.value, 10);
        updateSlider();
    });

    turn_img.addEventListener("click", () => {
        var turn = document.querySelector('.card');
           turn.style.transform = "rotate(6deg)";
        
    })

    turn_img_2.addEventListener("click", () => {
        var turn_2 = document.querySelector('.card');
        var turn_2_it = localStorage.getItem('.turn_2');

            if(turn_2_it) {
                turn_2.style.transform = `rotate(${turn_2_it}45deg)`;
                localStorage.setItem("turn_2", turn_2);
                alert('s');
                console.log(turn_2);
            }

        localStorage.setItem("turn_2", turn_2);
        localStorage.getItem("turn_2", turn_2);

        console.log(localStorage.getItem());
    })

    fetchUsers();
});
