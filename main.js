let processor = {
		timerCallback: function() {
			if (this.video.paused || this.video.ended) {
				return;
			}
			this.computeFrame();
			let this_ = this;
			setTimeout(function () {
					this_.timerCallback();
				}, 0);
		},
		doLoad: function() {
			this.video = document.getElementById('video');
			this.canvas = document.getElementById('canvas');
			this.context = this.canvas.getContext('2d');
			let this_ = this;
			this.video.addEventListener('play', function() {
				this_.width = this_.video.videoWidth / 2;
				this_.height = this_.video.videoHeight / 2;
				this_.timerCallback();
			}, false);
		},
		computeFrame: function() {
			let l = frame.data.length / 4;
			for (let i = 0; i < l; i++) {
				let r = frame.data[i * 4 + 0];
				let g = frame.data[i * 4 + 1];
				let b = frame.data[i * 4 + 2];
				if (g > 100 && r > 100 && b < 43)
					frame.data[i * 4 + 3] = 0;
			}
			this.context.putImageData(frame, 0, 0);
			return;
		}
	};

document.addEventListener('DOMContentLoaded', () => {
	processor.doLoad();
});