class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      this.$imageInfo.classList.remove("fade");

      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
  
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // x 키, 이미지, 혹은 ESC 키 누를시 모달창 끄기 기능

      document.addEventListener("click", (e) => {
        if (
          e.target == document.querySelector(".ImageInfo") ||
          e.target == document.querySelector(".close")
        ) {
          this.$imageInfo.classList.add("fade");
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.keyCode == 27) {
          this.$imageInfo.classList.add("fade");
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
