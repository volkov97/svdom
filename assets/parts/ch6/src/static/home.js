document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('newSvgForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;

    window
      .axios({
        method: 'POST',
        url: '/api/svgs',
        data: {
          content: form.elements.content.value,
        },
      })
      .then(() => {
        window.location.reload();
      });
  });

  Array.from(document.getElementsByClassName('removeSvgButton')).forEach(
    (element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        window
          .axios({
            method: 'DELETE',
            url: `/api/svgs/${element.dataset.id}`,
          })
          .then(() => {
            window.location.reload();
          });
      });
    }
  );

  Array.from(document.getElementsByClassName('likeSvgButton')).forEach(
    (element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();

        window
          .axios({
            method: 'PUT',
            url: `/api/svgs/${element.dataset.id}`,
            data: {
              isLiked: element.dataset.like === 'true' ? true : false,
            },
          })
          .then(() => {
            window.location.reload();
          });
      });
    }
  );
});
