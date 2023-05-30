# RPA

[toc]

## 基础

### 关于RPA

RPA 的全称是 Robotic Process Automation

RPA不一定需要使用专门的 RPA 软件来实现自动化流程，可以使用各种编程语言和工具来编写自动化脚本来实现。使用编程语言和工具来编写自动化流程称之为 Code-Based RPA，而使用专门的 RPA 软件来实现自动化流程称之为 Low-Code RPA。

无论是 Code-Based RPA 还是 Low-Code RPA，其目的都是实现自动化流程，提高工作效率，从而节省时间和人力成本。需要根据实际情况选择适合自己的 RPA 方式，并根据业务需求和技术水平来制定相应的规划和策略。

### Code-Based RPA

Code-Based RPA 可以通过编写脚本来实现自动化流程，例如使用 Python、Java、C# 等编程语言来编写脚本，利用相关的库或框架来模拟用户操作。另外还有一些其他工具可以帮助我们实现自动化流程，比如 Selenium WebDriver、PyAutoGUI、AutoIt 等。

[python-常见rpa库](#python-常见rpa库)

### Low-Code RPA

Low-Code RPA 则是使用 RPA 软件平台来创建自动化流程，通过可视化拖拽的方式构建工作流，并配置相应的规则和条件来实现自动化流程。这类软件几乎不需要编写代码，即可通过简单的拖拽、点选等方式快速创建自动化流程，既能提高效率，也降低了技术门槛。

[python-常见rpa库](#python-常见rpa库)

### 游戏领域的RPA

在游戏领域中，RPA 技术可以应用于以下几个方面：

* 游戏自动化测试：游戏开发商需要对游戏进行各种不同的测试，包括功能测试、兼容性测试和性能测试等。通过使用 RPA 技术，可以实现游戏自动化测试，减少测试时间和成本，提高测试效率和质量。
* 自动化游戏机制：一些游戏需要大量的重复操作，例如在游戏中打怪升级、采集资源等。通过使用 RPA 技术，可以实现自动化游戏机制，让玩家能够更高效地完成游戏任务。
* 游戏数据采集和分析：游戏数据是非常重要的，它可以帮助游戏开发商了解玩家行为和需求，并优化游戏体验。通过使用 RPA 技术，可以采集游戏数据并进行分析，帮助游戏开发商做出更好的决策。

需要注意的是，在游戏领域中使用 RPA 技术也会面临一些挑战，例如游戏安全性问题、反作弊问题等。因此，在使用 RPA 技术时，需要遵守相关法律法规和游戏规则，以确保不会造成损害。

---

以下是一些具体实现参考：

* 使用 PyAutoGUI：PyAutoGUI 是 Python 的一个库，可以通过模拟键盘、鼠标输入和屏幕截图等方式实现自动化操作。可以编写 Python 脚本，使用 PyAutoGUI 来模拟人类玩家的操作步骤。
* 使用 AHK（AutoHotkey）：AHK 是 Windows 平台下的一种脚本语言，它可以模拟按键和鼠标操作。可以使用 AHK 编写脚本，来实现对游戏的自动化操控。
* 使用 MacroGoblin： MacroGoblin 是一款商业 RPA 工具，可以用于对多种游戏进行自动化操作。通过录制或编写自定义脚本，可以实现自动打怪、采集、升级等操作。 [关于MacroGoblin](#关于macrogoblin)

## 附件

### 关于MacroGoblin

MacroGoblin 是一款商业 RPA 工具，专为 Windows 平台下的多种游戏进行自动化操作设计，包括 WOW、EVE Online、Guild Wars 等。该工具提供了图形用户界面，支持脚本编写和录制，使用者可以通过它来实现自动化操作、自动升级、刷怪等操作。

MacroGoblin 的主要特点包括：

1. 灵活性：MacroGoblin 支持多种定制和扩展，包括脚本编写和插件的添加等，使用者可以根据自身需求进行灵活的配置和定制。

2. 易用性：MacroGoblin 提供了可视化的拖拽式操作界面，同时安装时提供安装向导，使得初学者也能够快速上手使用。

3. 强大的脚本编辑器：MacroGoblin 的脚本编写环境功能强大，支持多种语言和语法，允许开发者进行高级定制和扩展。

4. 自动更新：MacroGoblin 会定期自动检查更新，以保持软件始终更新到最新版本，保证其稳定性和安全性。

5. 直观的日志记录：MacroGoblin 提供了详尽的日志记录功能，以便开发者或使用者在使用过程中及时跟踪和解决问题。

总之，MacroGoblin 是一款强大的 RPA 工具，可以用于多种游戏自动化操作。无论是初学者还是开发者，使用 MacroGoblin 进行自动化操作都是一种值得尝试的选择。需要注意的是，在使用 MacroGoblin 进行自动化操作时，需要遵守各大游戏的服务条款和用户协议，以免触犯相关规定造成损失。

### 常见 RPA 软件

* 商业RPA软件：
  * UiPath：UiPath 是一款功能强大的 RPA 平台，可用于构建和管理自动化流程。UiPath 的核心部分是一个基于 .NET 开发的桌面应用程序，支持多种操作系统和语言，并提供丰富的组件库和模板，方便开发人员设计和实现自动化流程。此外，UiPath 还提供了云端管理和监控工具，以及更高级别的 AI 功能，如自然语言处理和机器学习等。
  * Automation Anywhere：Automation Anywhere 是另一款功能强大的 RPA 平台，支持多种语言和操作系统，并提供了丰富的组件库和模板，使得开发人员能够快速地构建和管理自动化流程。此外，Automation Anywhere 还通过云端管理工具和 API 接口，为企业提供更高效的自动化流程管理解决方案。
  * Blue Prism：Blue Prism 是一个基于 .NET 开发的 RPA 工具，专注于商业流程自动化（BPA）领域，并提供了完整的流程管理平台和丰富的组件库，使得企业能够更好地管理和监控自动化流程。此外，Blue Prism 还提供了云端管理和 AI 功能，包括自然语言处理和机器学习等。
  * WorkFusion：WorkFusion 是一个功能强大的 RPA 平台，支持多种语言和操作系统，并提供了无代码自动化、人工智能等高级功能。WorkFusion 的核心部分是一个基于 Java 开发的桌面应用程序，可用于构建和管理自动化流程，同时也提供了云端管理和监控工具，如人工智能功能等。
  * Kofax：Kofax 是一个功能强大的 RPA 平台，专注于企业级自动化流程管理，提供了完整的流程设计和管理工具，以及丰富的 AI 功能，如自然语言处理和机器学习等。此外，Kofax 还提供了广泛的 API 接口和云端管理工具，方便企业进行更高效的自动化流程管理。

---

* 开源RPA软件：
  * Robot Framework： Robot Framework 是一款 Python 编写的通用自动化测试框架，可支持 Web、桌面和移动应用等。
  * TagUI: 前面提到的基于 Chrome 浏览器的 RPA 工具，官方开源并持续更新中。
  * UiPath Community Edition： UiPath 是一款商业 RPA 工具，但是它的社区版是免费的，功能较为完善，可用于执行各种自动化任务。
  * AutoIt： AutoIt 是一款 Windows 平台的自动化工具，支持鼠标、键盘模拟，同时它还提供了内置的脚本语言。
  * Selenium： Selenium 是一个自动化测试框架，主要用于 Web 应用程序的自动化测试，也可以用于网页自动化任务。

### python 常见RPA库

如果你已经掌握了 Python 的基本语法，那么在 RPA 方向中，以下库、框架和工具可能会对你有所帮助：

* PyAutoGUI：PyAutoGUI 是一个 Python 库，可用于控制键盘和鼠标，从而实现自动化流程的自动输入、点击和滚动等操作。
* Selenium WebDriver：Selenium WebDriver 是一组用于浏览器自动化的工具，可以模拟用户的操作，例如自动化打开浏览器、填写表单、单击按钮等等。
* UiPath Python Activities：UiPath Python Activities 是 UiPath 提供的一组自定义活动，用于在 RPA 流程中使用 Python 脚本，可以在 UiPath 中直接调用 Python 代码。
* OpenCV：OpenCV (Open Source Computer Vision Library) 是一个计算机视觉库，可用于图像和视频处理，在 RPA 过程中，OpenCV 可以用于自动化流程中的图像识别和处理。
* PyWinAuto：PyWinAuto 是一个 Python 库，可用于 Windows 操作系统上的 GUI 自动化，包括模拟键盘和鼠标操作、控制窗口和消息传递等等。

### python 实战 wow rpa

#### 自动钓鱼

以下是一段使用 PyAutoGUI 模拟 WOW 自动钓鱼的示例代码：

```python
import pyautogui
import random
import time

# 设置屏幕分辨率
pyautogui.size() = (1920, 1080)

# 设置钓鱼区域的坐标和大小
fish_area_left = 900
fish_area_top = 200
fish_area_width = 200
fish_area_height = 200

# 随机等待几秒钟，避免被检测为机器人
time.sleep(random.uniform(3, 5))

# 移动到钓鱼点并开始钓鱼
pyautogui.moveTo(fish_area_left + fish_area_width / 2, fish_area_top + fish_area_height / 2, duration=0.5)
pyautogui.click()

# 等待钓鱼完成，如果时间过长则重新开始
start_time = time.time()
while True:
    elapsed_time = time.time() - start_time
    if elapsed_time > 30:
        break
    if pyautogui.locateOnScreen('fish.png', region=(fish_area_left, fish_area_top, fish_area_width, fish_area_height), confidence=0.8):
        # 鱼上钩了，点击拾取按钮
        pyautogui.press('2')
    else:
        # 等待片刻，然后再次使用鼠标左键进行操作
        time.sleep(random.uniform(1, 3))
        pyautogui.click()
```

针对上面的自动钓鱼代码，还有优化的空间。下面是一些可能有用的优化建议：

* 使用 PyAutoGUI 的 locateCenterOnScreen() 方法来获取鱼儿上钩的位置，避免误判率。
* 在等待鱼儿上钩和拾取鱼儿之间加入一个随机等待时间，使其更像人类玩家的操作行为。
* 使用 PyAutoGUI 的 hotkey() 方法，替代 press() 方法实现按键操作。
* 如果需要在后台运行自动化操作，可以使用 PyAutoGUI 的 failsafe 参数设置，在鼠标移动到屏幕左上角时，停止自动化操作。

以下是一个针对上述几点优化后的自动钓鱼代码示例：

```python
import pyautogui
import random
import time

# 设置屏幕分辨率
pyautogui.size() = (1920, 1080)

# 设置钓鱼区域的坐标和大小
fish_area_left = 900
fish_area_top = 200
fish_area_width = 200
fish_area_height = 200

# 设置图片路径和匹配精度
fish_img_path = 'fish.png'
fish_img_confidence = 0.8

# 定义一个函数，用于随机等待一段时间
def random_sleep(min_time, max_time):
    time.sleep(random.uniform(min_time, max_time))

# 随机等待几秒钟，避免被检测为机器人
random_sleep(3, 5)

# 移动到钓鱼点并开始钓鱼
pyautogui.moveTo(fish_area_left + fish_area_width / 2, fish_area_top + fish_area_height / 2, duration=0.5)
pyautogui.click()

# 等待钓鱼完成，如果时间过长则重新开始
start_time = time.time()
while True:
    elapsed_time = time.time() - start_time
    if elapsed_time > 30:
        break
    # 获取鱼儿上钩的位置
    fish_pos = pyautogui.locateCenterOnScreen(fish_img_path, region=(fish_area_left, fish_area_top, fish_area_width, fish_area_height), confidence=fish_img_confidence)
    if fish_pos is not None:
        # 鱼上钩了，随机等待一段时间然后按下拾取快捷键
        random_sleep(1, 3)
        pyautogui.hotkey('shift', '2')
    else:
        # 等待片刻，然后再次使用鼠标左键进行操作
        random_sleep(1, 3)
        pyautogui.click()
    # 实现自动停止，防止程序失控造成意外
    pyautogui.PAUSE = random.uniform(0.1, 0.3)
    if pyautogui.position() == (0, 0):
        break
```

#### 自动打怪

好的，下面是一个使用 PyAutoGUI 实现 WoW 自动打怪和升级的示例代码：

```python
import pyautogui
import random
import time

# 设置屏幕分辨率
pyautogui.size() = (1920, 1080)

# 设置打怪区域的坐标和大小
monster_area_left = 800
monster_area_top = 300
monster_area_width = 400
monster_area_height = 400

# 设置攻击键和自动寻路键
attack_key = '1'
auto_walk_key = 'numlock'

# 设置等待时间
wait_time_short = 0.5
wait_time_long = 2

# 随机等待几秒钟，避免被检测为机器人
time.sleep(random.uniform(3, 5))

# 开始自动打怪和升级
while True:
    # 移动到打怪区域并开始寻路
    pyautogui.moveTo(monster_area_left + monster_area_width / 2, monster_area_top + monster_area_height / 2, duration=0.5)
    pyautogui.press(auto_walk_key)

    # 等待寻路完成
    time.sleep(wait_time_long)

    # 先检测一下有没有敌对单位
    enemy_pos = pyautogui.locateOnScreen('enemy.png', region=(monster_area_left, monster_area_top, monster_area_width, monster_area_height), confidence=0.8)
    if enemy_pos is not None:
        # 如果有敌对单位，就开始攻击
        pyautogui.press(attack_key)
        time.sleep(wait_time_short)
    else:
        # 如果没有敌对单位，就等待一段时间
        time.sleep(wait_time_long)

    # 检测是否升级并自动选择升级奖励
    level_up_pos = pyautogui.locateOnScreen('level_up.png', confidence=0.8)
    if level_up_pos is not None:
        # 点击升级奖励
        pyautogui.click(level_up_pos)

    # 实现自动停止，防止程序失控造成意外
    pyautogui.PAUSE = random.uniform(0.1, 0.3)
    if pyautogui.position() == (0, 0):
        break
```

这个代码通过定期检测周围的敌对单位来进行自动攻击，如果发现敌对单位就开始攻击，否则就等待。此外，还添加了升级和选择升级奖励的逻辑。

上面那个打怪代码只能刷面前的怪物。如果想要实现自动化打怪并随机移动、找怪，可以使用以下的代码示例：

```python
import pyautogui
import random
import time

# 设置屏幕分辨率
pyautogui.size() = (1920, 1080)

# 计算游戏窗口的大小和位置
game_area_left = 100
game_area_top = 100
game_area_width = 1600
game_area_height = 900
game_window_pos = (game_area_left + game_area_width // 2, game_area_top + game_area_height // 2)

# 移动到游戏窗口并激活
pyautogui.moveTo(game_window_pos, duration=0.5)
pyautogui.click()

# 定义一个函数，用于随机等待一段时间
def random_sleep(min_time, max_time):
    time.sleep(random.uniform(min_time, max_time))

# 随机等待几秒钟，避免被检测为机器人
random_sleep(3, 5)

# 开始自动打怪
while True:
    # 随机移动一段距离
    move_x = random.randint(-200, 200)
    move_y = random.randint(-200, 200)
    pyautogui.moveRel(move_x, move_y, duration=1)

    # 随机等待一段时间，让怪物有时间刷新
    random_sleep(1, 2)

    # 在一定范围内搜索敌对单位
    search_distance = random.randint(200, 300)
    enemy_pos = pyautogui.locateOnScreen('enemy.png', region=(game_area_left, game_area_top, game_area_width, game_area_height), confidence=0.8, grayscale=True, minSearchTime=3, searchDistance=search_distance)
    if enemy_pos is not None:
        # 如果找到了敌对单位，就移动到敌对单位并攻击
        enemy_center = pyautogui.center(enemy_pos)
        pyautogui.moveTo(enemy_center, duration=0.5)
        pyautogui.click()
        random_sleep(0.5, 1)
        pyautogui.press('1')
        random_sleep(1, 2)
    else:
        # 如果没有找到敌对单位，就随机移动一段距离
        continue

    # 实现自动停止，防止程序失控造成意外
    pyautogui.PAUSE = random.uniform(0.1, 0.3)
    if pyautogui.position() == (0, 0):
        break
```

上面的代码实现了以下功能：

* 随机移动一段距离；
* 在一定范围内搜索敌对单位；
* 如果找到了敌对单位，就向其移动并攻击；
* 如果没有找到敌对单位，就随机移动一段距离。

需要注意的是，由于该代码只是一个示例，可能无法完全适用于所有情况。在使用 PyAutoGUI 进行自动化操作时，需要根据具体的情况进行调整。
