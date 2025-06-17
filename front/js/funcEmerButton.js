function handleEmergency() {
    const videos = [
      "https://youtu.be/CcSIvhDlYWw?si=mfdX9-1E3VinSS77",
      "https://youtu.be/7V2VVCjoONc?si=wGd5yVe_QFomQ4VG",
      "https://youtu.be/m7Bc3pLyij0?si=gs-4E0lqVF97Vbv2",
      "https://youtu.be/K3Qzzggn--s?si=zEyfVTLw1z4yk8K1"
    ];
    
    const aleatorio = Math.floor(Math.random() * videos.length);
    window.location.href = videos[aleatorio];
  }
  