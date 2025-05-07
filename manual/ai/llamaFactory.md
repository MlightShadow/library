安装时需要注意安装合适的python,pytorch torchvision, torchaudio, cuda版本 否则 python -c "import torch;print(torch.cuda.is_available())" 无法通过

pip install torch==2.4.1+cu124 torchvision==0.19.1+cu124 torchaudio==2.4.1+cu124 --index-url https://download.pytorch.
org/whl/cu124

部分镜像仓库其实是没有nightly版本的，最后选择了官方库直接拉取网络环境还凑的情况下 拉取了约2小时